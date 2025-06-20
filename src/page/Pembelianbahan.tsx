import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/tambahData.css";
import back from "../../public/assets/icons/back.png";
import { Dataquery } from "../lib/Dataquery";
import Swal from "sweetalert2";

interface PakanItem {
    jenis_id: string;
    jumblah: string;
    harga: string;
    total_harga: string;
}

const Pembelianbahan = () => {
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    const [pakanList, setPakanList] = useState<PakanItem[]>([
        {
            jenis_id: "",
            jumblah: "",
            harga: "",
            total_harga: "",
        },
    ]);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) setToken(savedToken);
    }, []);

    const handleChange = <T extends PakanItem>(
        list: T[],
        setList: React.Dispatch<React.SetStateAction<T[]>>,
        idx: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        jumlahKey: keyof T,
        hargaKey: keyof T,
        totalKey: keyof T
    ) => {
        const { name, value } = e.target;
        const newList = [...list];
        newList[idx] = { ...newList[idx], [name]: value };

        const jumlah = parseFloat(String(newList[idx][jumlahKey])) || 0;
        const harga = parseFloat(String(newList[idx][hargaKey])) || 0;
        (newList[idx][totalKey] as string) = (jumlah * harga).toString();

        setList(newList);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token) {
            Swal.fire({
                title: "INFO",
                text: `Isi data Field Kosong`,
                icon: "error",
                confirmButtonText: "Ok!",
                confirmButtonColor: "#299CD3"
            }).then(() => {
                location.reload(); // Reload halaman setelah user klik OK
            });
            return;
        }

        const pakanValid = pakanList.filter(
            (p) => p.jenis_id && p.jumblah && p.harga
        );

        if (pakanValid.length === 0) {
            Swal.fire({
                title: "INFO",
                text: `Isi data Field Kosong`,
                icon: "error",
                confirmButtonText: "Ok!",
                confirmButtonColor: "#299CD3"
            });
            return;
        }

        try {
            for (const data of pakanValid) {
                await Dataquery.addTransactionBahanBaku(data, token);
            }

            Swal.fire({
                title: "INFO",
                text: `Data Berhasil Tercatat`,
                icon: "success",
                confirmButtonText: "Ok!"
            });

            setPakanList([
                { jenis_id: "", jumblah: "", harga: "", total_harga: "" },
            ]);
        } catch (error) {
            console.error("Gagal submit data:", error);
            Swal.fire({
                title: "INFO",
                text: `Data Gagal Tercatat`,
                icon: "error",
                confirmButtonText: "Ok!"
            });
        }
    };

    const handleBackClick = () => {
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="tambahdata">


            <div className="tambahdata-container">
                <div className="tambahdata-head">
                    <button className="back" onClick={handleBackClick}>
                        <img width="100%" src={back} alt="Kembali" />
                    </button>
                    <h2>Input Pengeluaran</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Bahan Baku</label>
                        {pakanList.map((pakan, idx) => (
                            <div key={idx} className="input-block">
                                <div className="input-row">
                                    <select
                                        name="jenis_id"
                                        value={pakan.jenis_id}
                                        onChange={(e) =>
                                            handleChange(
                                                pakanList,
                                                setPakanList,
                                                idx,
                                                e,
                                                "jumblah",
                                                "harga",
                                                "total_harga"
                                            )
                                        }
                                        className="input"
                                    >
                                        <option value="">Pilih Jenis</option>
                                        <option value="1">Katul</option>
                                        <option value="2">Jagung</option>
                                        <option value="3">Ketela</option>
                                        <option value="4">Janggel</option>
                                        <option value="5">BKK</option>
                                        <option value="6">CGF</option>
                                        <option value="7">Ampas Kecap</option>
                                        <option value="8">Pelet</option>
                                    </select>

                                    <input
                                        name="jumblah"
                                        type="number"
                                        placeholder="Jumlah"
                                        value={pakan.jumblah}
                                        onChange={(e) =>
                                            handleChange(
                                                pakanList,
                                                setPakanList,
                                                idx,
                                                e,
                                                "jumblah",
                                                "harga",
                                                "total_harga"
                                            )
                                        }
                                        className="input"
                                    />

                                    <input
                                        name="harga"
                                        type="number"
                                        placeholder="Harga"
                                        value={pakan.harga}
                                        onChange={(e) =>
                                            handleChange(
                                                pakanList,
                                                setPakanList,
                                                idx,
                                                e,
                                                "jumblah",
                                                "harga",
                                                "total_harga"
                                            )
                                        }
                                        className="input"
                                    />
                                </div>

                                <input
                                    name="total_harga"
                                    type="number"
                                    placeholder="Total"
                                    value={pakan.total_harga}
                                    className="input full"
                                    readOnly
                                />

                                {pakanList.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setPakanList(
                                                pakanList.filter(
                                                    (_, i) => i !== idx
                                                )
                                            )
                                        }
                                        className="hapus-btn"
                                    >
                                        Hapus
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() =>
                                setPakanList([
                                    ...pakanList,
                                    {
                                        jenis_id: "",
                                        jumblah: "",
                                        harga: "",
                                        total_harga: "",
                                    },
                                ])
                            }
                            className="tambah-btn"
                        >
                            Tambah Pakan
                        </button>
                    </div>

                    <button type="submit" className="submit-btn">
                        Tambah
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Pembelianbahan;
