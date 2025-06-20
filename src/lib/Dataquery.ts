// Dataquery.ts
import Swal from "sweetalert2";
import {
    type DataType,
    type RawDataType,
    type DetailDataType,
    type DombaItem,
    type PakanItem,
} from "../interface/interface.";

const baseURL = import.meta.env.VITE_API_URL;

export class Dataquery {
    private static handleForbidden() {
        Swal.fire({
            title: "INFO",
            text: `Sesi kadaluarsa!`,
            icon: "error",
            confirmButtonText: "Ok!",
            confirmButtonColor: "#299CD3"
        }).then(() => {
            // Setelah tombol OK diklik
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "/login";
        });
    }

    static async getData(month: number, year: number, token: string): Promise<DataType[]> {
        try {
            const res = await fetch(`${baseURL}/data/bulanan?bulan=${month + 1}&tahun=${year}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 403) {
                this.handleForbidden();
                throw new Error("Akses ditolak! Token tidak valid atau kamu tidak punya izin.");
            }

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const rawData: RawDataType[] = await res.json();

            return rawData.map((item, index) => {
                const dateObj = new Date(item.tanggal);
                const hari = dateObj.toLocaleDateString("id-ID", { weekday: "long" });
                const tanggalFormatted = `${hari} ${dateObj.toLocaleDateString("id-ID").replace(/\//g, "-")}`;

                return {
                    id: index + 1,
                    date: tanggalFormatted,
                    income: parseInt(item.total_pemasukan),
                    expanse: parseInt(item.total_pengeluaran),
                    status: "pass",
                };
            });
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : String(error);
            return [
                {
                    id: 0,
                    date: new Date().toLocaleDateString("id-ID"),
                    income: 0,
                    expanse: 0,
                    status: `Error: ${errMsg}`,
                },
            ];
        }
    }

    static async getDataDetail(date: string, token: string): Promise<DetailDataType | Error> {
        try {
            const res = await fetch(`${baseURL}/data/harian?tanggal=${encodeURIComponent(date)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 403) {
                this.handleForbidden();
                throw new Error("Akses ditolak! Token tidak valid atau kamu tidak punya izin.");
            }

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            return await res.json();
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : String(error);
            return new Error(errMsg);
        }
    }

    static async addTransactionDomba(data: DombaItem, token: string) {
        try {
            const res = await fetch(`${baseURL}/tambah/insertPenjualanDomba`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.status === 403) {
                this.handleForbidden();
                throw new Error("Akses ditolak! Token tidak valid atau kamu tidak punya izin.");
            }

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const rawData = await res.json();
            return { status: rawData.message, info: "Pass" };
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : String(error);
            return { status: errMsg, info: "Fail" };
        }
    }

    static async addTransactionPakan(data: PakanItem, token: string) {
        try {
            const res = await fetch(`${baseURL}/tambah/InsertPenjualanPakan`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.status === 403) {
                this.handleForbidden();
                throw new Error("Akses ditolak! Token tidak valid atau kamu tidak punya izin.");
            }

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const rawData = await res.json();
            return { status: rawData.message, info: "Pass" };
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : String(error);
            return { status: errMsg, info: "Fail" };
        }
    }

    static async addTransactionBahanBaku(data: PakanItem, token: string) {
        try {
            const res = await fetch(`${baseURL}/tambah/insertPembelianBahan`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.status === 403) {
                this.handleForbidden();
                throw new Error("Akses ditolak! Token tidak valid atau kamu tidak punya izin.");
            }

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const rawData = await res.json();
            return { status: rawData.message, info: "Pass" };
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : String(error);
            return { status: errMsg, info: "Fail" };
        }
    }
}
