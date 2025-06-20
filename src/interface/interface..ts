
export interface DataType {
    id: number;
    date: string;
    income: number;
    expanse: number;
    status: string;
}

export interface DombaItem {
    jenisDomba: string;
    kondisi: string;
    jumlahDomba: string;
    hargaDomba: string;
    totalDomba: string;
}
export interface PakanItem {
    jenis_id: string;
    jumblah: string;
    harga: string;
    total_harga: string;
}



export interface RawDataType {
    tanggal: string;
    total_pemasukan: string;
    total_pengeluaran: string;
}
interface data {
    jenis: string;
    count: number;
    price_unit: number;
    price: number;
}

export interface DetailDataType {
    date: Date;
    income: {
        domba: {
            transaksi: data[],
        };
        pakan: {
            transaksi: data[],
        };
        price: number;
    };
    expanse: {
        bahan_baku: {
            transaksi: data[],
        }
        price: number,
    }
}

export interface ProfileData {
    username: string;
    email: string;
    file?: string;
    avatar?: string; // tambahkan jika kamu pakai 'avatar' juga
}