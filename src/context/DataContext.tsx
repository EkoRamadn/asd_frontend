import "../style/reset.css"

import {
    createContext,
    useState,
    useContext,
    useEffect,
    type ReactNode
} from 'react';

interface DataType {
    id: number;
    date: string;
    income: number;
    expanse: number;
}

type DataContextType = {
    dataweek: DataType[] | undefined;
    setDataisWeek: (data: DataType[]) => void;  // Changed to expect an array of DataType
    data: DataType[] | undefined;
    resetData: () => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

type DataProviderProps = {
    children: ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
    const [data, setData] = useState<DataType[] | undefined>(undefined);
    const [dataWeek, setDataWeek] = useState<DataType[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);


    // useEffect(() => {
    //     const loadData = async () => {
    //         setLoading(true);
    //         try {
    //             // const res = await fetch('/data/data.json');
    //             const res = await fetch('/api/data/bulanan?bulan=6&tahun=2025');
    //             const json: DataType[] = await res.json();
    //             setData(json);
    //         } catch (err) {
    //             console.error('Gagal memuat data:', err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadData();
    // }, []);
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Token tidak ditemukan di localStorage');

                const res = await fetch('/api/data/bulanan?bulan=6&tahun=2025', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error(`Status: ${res.status}`);

                const rawData: any[] = await res.json();

                // ✨ Transformasi data
                const formattedData: DataType[] = rawData.map((item, index) => {
                    const dateObj = new Date(item.tanggal);
                    const hari = dateObj.toLocaleDateString('id-ID', {
                        weekday: 'long',
                    });
                    const tanggalFormatted = `${hari} ${dateObj
                        .toLocaleDateString('id-ID')
                        .replace(/\//g, '-')}`;

                    return {
                        id: index + 1,
                        date: tanggalFormatted,
                        income: parseInt(item.total_pemasukan),
                        expanse: parseInt(item.total_pengeluaran),
                    };
                });

                setData(formattedData);

            } catch (err) {
                console.error('Gagal memuat data:', err);
                alert('Gagal mengambil data, mungkin token-nya invalid 😭');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);


    const setDataisWeek = (data: DataType[]) => setDataWeek(data);


    const resetData = () => {
        setData(undefined);
        setDataWeek(undefined);
    };

    return (
        <DataContext.Provider value={{ dataweek: dataWeek, setDataisWeek, data, resetData }}>
            {loading ? <div className='load'>Loading...</div> : children}
        </DataContext.Provider>
    );
};

// Custom hook to access data context
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData harus digunakan di dalam DataProvider!');
    return context;
};
