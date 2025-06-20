import "../style/reset.css";

import {
    createContext,
    useState,
    useContext,
    useEffect,
    type ReactNode
} from 'react';

import { type DataType } from "../interface/interface.";
import { Dataquery } from "../lib/Dataquery";
import { getDataWeek } from "../utils/dataWeek";
const baseURL = import.meta.env.VITE_API_URL;
type DataContextType = {
    dataweek: DataType[] | [];
    setDataisWeek: (data: DataType[]) => void;
    data: DataType[] | [];
    resetData: () => void;
    loading: boolean;
    dateclick: string;
    setDatedata: (data: string) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

type DataProviderProps = {
    children: ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
    const [data, setData] = useState<DataType[] | []>([]);
    const [dataWeek, setDataWeek] = useState<DataType[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [dateclick, setDateclick] = useState<string>('');

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn('Token tidak ditemukan. User belum login.');
                    return;
                }

                const now: Date = new Date();
                const month: number = now.getMonth();
                const year: number = now.getFullYear();

                const formatData: DataType[] = await Dataquery.getData(month, year, token);
                const res = await fetch(`${baseURL}/getprofile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!res.ok) throw new Error("Gagal ambil profil");

                const data = await res.json();
                if (data[0]?.file) {
                    localStorage.setItem('avatar', data[0]?.file)
                }

                setData(formatData);
                setDataWeek(getDataWeek(formatData));

            } catch (err) {
                console.error('Gagal memuat data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const setDatedata = (data: string) => {
        setDateclick(data)
    }
    const setDataisWeek = (data: DataType[]) => setDataWeek(data);

    const resetData = () => {
        setData([]);
        setDataWeek([]);
        setLoading(false);
    };

    return (
        <DataContext.Provider value={{ dataweek: dataWeek, setDataisWeek, data, resetData, loading, dateclick, setDatedata }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData harus digunakan di dalam DataProvider!');
    return context;
};
