import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/tambahData.css";
import back from "../../public/assets/icons/back.png";
import { Dataquery } from "../lib/Dataquery";
import Swal from "sweetalert2";

interface DombaItem {
    jenisDomba: string;
    kondisi: string;
    jumlahDomba: string;
    hargaDomba: string;
    totalDomba: string;
}

interface PakanItem {
    jenis_id: string;
    jumblah: string;
    harga: string;
    total_harga: string;
}

const TambahData = () => {
    const [token, setToken] = useState<string | null>(null);
    const [dombaList, setDombaList] = useState<DombaItem[]>([
        {
            jenisDomba: "",
            kondisi: "",
            jumlahDomba: "",
            hargaDomba: "",
            totalDomba: "",
        },
    ]);

    const [pakanList, setPakanList] = useState<PakanItem[]>([
        {
            jenis_id: "",
            jumblah: "",
            harga: "",
            total_harga: "",
        },
    ]);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) setToken(savedToken);
    }, []);

    const handleChange = <T extends DombaItem | PakanItem>(
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
                text: `Sesi Login Tertutup`,
                icon: "error",
                confirmButtonText: "Ok!",
                confirmButtonColor: "#299CD3",
            }).then(() => {
                location.reload(); // Reload halaman setelah user klik OK
            });
            return;
        }

        const dombaValid = dombaList.filter(
            (d) => d.jenisDomba && d.kondisi && d.jumlahDomba && d.hargaDomba
        );
        const pakanValid = pakanList.filter(
            (p) => p.jenis_id && p.jumblah && p.harga
        );

        if (dombaValid.length === 0 && pakanValid.length === 0) {
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
            for (const data of dombaValid) {
                await Dataquery.addTransactionDomba(data, token);
            }

            for (const data of pakanValid) {
                await Dataquery.addTransactionPakan(data, token);
            }

            Swal.fire({
                title: "INFO",
                text: `Data Berhasil Tercatat`,
                icon: "success",
                confirmButtonText: "Ok!"
            });
            setDombaList([
                { jenisDomba: "", kondisi: "", jumlahDomba: "", hargaDomba: "", totalDomba: "" },
            ]);
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

    return (
        <div className="tambahdata">


            <div className="tambahdata-container">
                <div className="tambahdata-head">
                    <button className="back" onClick={handleBack}>
                        <img width="100%" src={back} alt="Kembali" />
                    </button>
                    <h2>Input Pemasukan</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Domba Section */}
                    <div className="form-group">
                        <label>Domba</label>
                        {dombaList.map((domba, idx) => (
                            <div key={idx} className="input-block">
                                <div className="input-row">
                                    <select
                                        name="jenisDomba"
                                        value={domba.jenisDomba}
                                        onChange={(e) =>
                                            handleChange(dombaList, setDombaList, idx, e, "jumlahDomba", "hargaDomba", "totalDomba")
                                        }
                                        className="input"
                                    >
                                        <option value="">Pilih Jenis</option>
                                        <option value="1">Texel</option>
                                        <option value="2">Full Blood</option>
                                        <option value="3">Cross Texel</option>
                                        <option value="4">F Dorper</option>
                                        <option value="5">Cross Sulfox</option>
                                        <option value="6">Composit</option>
                                        <option value="7">Cross Local</option>
                                        <option value="8">Dombos</option>
                                    </select>

                                    <select
                                        name="kondisi"
                                        value={domba.kondisi}
                                        onChange={(e) =>
                                            handleChange(dombaList, setDombaList, idx, e, "jumlahDomba", "hargaDomba", "totalDomba")
                                        }
                                        className="input"
                                    >
                                        <option value="">Pilih Kondisi</option>
                                        <option value="1">Jantan</option>
                                        <option value="2">Betina</option>
                                        <option value="3">Buntingan</option>
                                        <option value="4">Babon Anak</option>
                                        <option value="5">Paket</option>
                                    </select>

                                    <input
                                        name="jumlahDomba"
                                        type="number"
                                        placeholder="Jumlah"
                                        value={domba.jumlahDomba}
                                        onChange={(e) =>
                                            handleChange(dombaList, setDombaList, idx, e, "jumlahDomba", "hargaDomba", "totalDomba")
                                        }
                                        className="input"
                                    />

                                    <input
                                        name="hargaDomba"
                                        type="number"
                                        placeholder="Harga"
                                        value={domba.hargaDomba}
                                        onChange={(e) =>
                                            handleChange(dombaList, setDombaList, idx, e, "jumlahDomba", "hargaDomba", "totalDomba")
                                        }
                                        className="input"
                                    />
                                </div>

                                <input
                                    name="totalDomba"
                                    type="number"
                                    placeholder="Total"
                                    value={domba.totalDomba}
                                    className="input full"
                                    readOnly
                                />

                                {dombaList.length > 1 && (
                                    <button type="button" onClick={() => setDombaList(dombaList.filter((_, i) => i !== idx))} className="hapus-btn">
                                        Hapus
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={() => setDombaList([...dombaList, { jenisDomba: "", kondisi: "", jumlahDomba: "", hargaDomba: "", totalDomba: "" }])} className="tambah-btn">
                            Tambah Domba
                        </button>
                    </div>

                    {/* Pakan Section */}
                    <div className="form-group">
                        <label>Pakan</label>
                        {pakanList.map((pakan, idx) => (
                            <div key={idx} className="input-block">
                                <div className="input-row">
                                    <select
                                        name="jenis_id"
                                        value={pakan.jenis_id}
                                        onChange={(e) => handleChange(pakanList, setPakanList, idx, e, "jumblah", "harga", "total_harga")}
                                        className="input"
                                    >
                                        <option value="">Pilih Jenis</option>
                                        <option value="1">S16</option>
                                        <option value="2">S18</option>
                                        <option value="3">S20</option>
                                    </select>

                                    <input
                                        name="jumblah"
                                        type="number"
                                        placeholder="Jumlah"
                                        value={pakan.jumblah}
                                        onChange={(e) => handleChange(pakanList, setPakanList, idx, e, "jumblah", "harga", "total_harga")}
                                        className="input"
                                    />

                                    <input
                                        name="harga"
                                        type="number"
                                        placeholder="Harga"
                                        value={pakan.harga}
                                        onChange={(e) => handleChange(pakanList, setPakanList, idx, e, "jumblah", "harga", "total_harga")}
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
                                    <button type="button" onClick={() => setPakanList(pakanList.filter((_, i) => i !== idx))} className="hapus-btn">
                                        Hapus
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={() => setPakanList([...pakanList, { jenis_id: "", jumblah: "", harga: "", total_harga: "" }])} className="tambah-btn">
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

export default TambahData;
