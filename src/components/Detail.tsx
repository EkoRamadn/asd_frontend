import { useEffect, useState } from "react";
import type { DetailDataType } from "../interface/interface.";
import "../style/detail.css";
import "../style/font.css";
import { useData } from "../context/DataContext";
import { Dataquery } from "../lib/Dataquery";
import Loading from "./Loading";
import back from "../../public/assets/icons/back.png"

const formatRupiah = (angka: number) =>
    angka.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

const Detail = () => {
    const [detailData, setDetailData] = useState<DetailDataType>();
    const [loading, setLoading] = useState<boolean>(true);
    const { dateclick } = useData();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const getToken = localStorage.getItem("token");
            if (!getToken) {
                setLoading(false);
                return;
            }

            const result = await Dataquery.getDataDetail(dateclick, getToken);
            if (result instanceof Error) {
                console.error(result.message);
                setLoading(false);
                return;
            }

            setDetailData(result);
            setLoading(false);
        };

        fetchData();
    }, [dateclick]);

    function handleClick() {
        document.getElementById("detail")?.classList.remove("show");
    }

    const dombaTransaksi = detailData?.income.domba.transaksi ?? [];
    const pakanTransaksi = detailData?.income.pakan.transaksi ?? [];
    const bahanBakuTransaksi = detailData?.expanse.bahan_baku.transaksi ?? [];

    const hasDomba = dombaTransaksi.length > 0;
    const hasPakan = pakanTransaksi.length > 0;
    const hasBahanBaku = bahanBakuTransaksi.length > 0;

    const totalIncome = detailData?.income?.price ?? 0;
    const totalExpanse = detailData?.expanse?.price ?? 0;

    const hasIncome = hasDomba || hasPakan;
    const hasData = hasIncome || hasBahanBaku;

    return (
        <div className="detail" id="detail">
            <div className="detail-container">
                <div className="title">
                    <button id="close" onClick={handleClick}>
                        <img src={back} alt="" />
                    </button>
                    <h2 className="inria-sans-regular">Detail</h2>
                </div>

                <div className="detail-head">
                    <span className="inria-sans-regular">{dateclick}</span>
                </div>

                {loading ? (
                    <div className="inria-sans-regular containerin"><Loading /></div>
                ) : (
                    <>
                        {!hasData && (
                            <p className="inria-sans-regular">
                                Tidak ada data pemasukan atau pengeluaran untuk hari ini.
                            </p>
                        )}

                        {hasIncome && (
                            <div className="detail-body">
                                <h2 className="inria-sans-regular">Pemasukan</h2>

                                {hasDomba && (
                                    <>
                                        <h3 className="inria-sans-regular">Domba</h3>
                                        <DataTable data={dombaTransaksi} showKondisi={true} />
                                    </>
                                )}

                                {hasPakan && (
                                    <>
                                        <h3 className="inria-sans-regular">Pakan</h3>
                                        <DataTable data={pakanTransaksi} />
                                    </>
                                )}

                                {totalIncome > 0 && (
                                    <p><strong>Total Pemasukan:</strong> {formatRupiah(totalIncome)}</p>
                                )}
                            </div>
                        )}

                        {hasBahanBaku && (
                            <div className="detail-body">
                                <h2 className="inria-sans-regular">Pengeluaran</h2>
                                <h3 className="inria-sans-regular">Bahan Baku</h3>
                                <DataTable data={bahanBakuTransaksi} />
                                {totalExpanse > 0 && (
                                    <p><strong>Total Pengeluaran:</strong> {formatRupiah(totalExpanse)}</p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

interface DataTableProps {
    data?: {
        jenis: string;
        kondisi?: string | null;
        count: number;
        price_unit: number;
        price: number;
    }[];
    showKondisi?: boolean;
}

const DataTable = ({ data, showKondisi = false }: DataTableProps) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="tabel-container">
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Jenis</th>
                        {showKondisi && <th>Kondisi</th>}
                        <th>Harga Satuan</th>
                        <th>Banyak</th>
                        <th>Harga Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((dt, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{dt.jenis}</td>
                            {showKondisi && <td>{dt.kondisi ?? "-"}</td>}
                            <td>{formatRupiah(dt.price_unit)}</td>
                            <td>{dt.count}</td>
                            <td>{formatRupiah(dt.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Detail;
