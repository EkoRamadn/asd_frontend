import './../style/beranda.css';
import income from "../../public/assets/icons/income.png";
import expanse from "../../public/assets/icons/expanse.png";
import { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';

interface DataType {
    id: number;
    date: string;
    income: number;
    expanse: number;
}

export const HistoryList = ({ data }: { data: DataType[] | undefined }) => {
    const [tmpData, setTmpData] = useState<DataType[] | undefined>(data);
    const { setDataisWeek } = useData();


    const formatJutaan = (amount: number): string => {
        return `${(amount / 1_000_000).toFixed(1)} JT`;
    };

    useEffect(() => {
        if (data) {
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 7);

            const filtered = data.filter((dt) => {
                const dataDate = new Date(dt.date.split(" ")[1].split("-").reverse().join("-"));

                return dataDate >= sevenDaysAgo && dataDate <= today;
            });

            if (filtered.length === 0) {
                const closestData = data
                    .map((current) => {
                        const currentDataDate = new Date(current.date.split(" ")[1].split("-").reverse().join("-"));

                        if (currentDataDate < today) {
                            return {
                                ...current,
                                distance: Math.abs(currentDataDate.getTime() - today.getTime())
                            };
                        }
                        return null;
                    })
                    .filter((item) => item !== null)
                    .sort((a, b) => (a!.distance - b!.distance))
                    .slice(0, 7);

                setTmpData(closestData);
                setDataisWeek(closestData)
            } else {
                setTmpData(filtered);
                setDataisWeek(filtered)
            }
        }
    }, [data]);
    return (
        <ul className="history-data-container">
            {tmpData?.map((dt) => (
                <li key={dt.id} className="fade-in">
                    <div className="history-item">
                        <div className="inria-sans-regular xl history-rigth">
                            <span>{dt.date}</span>
                        </div>
                        <div className="inria-sans-regular xl history-left">
                            <div className="income">
                                <div className="income-icon menu-icon">
                                    <img width="100%" src={income} alt="income" />
                                </div>
                                <span>{formatJutaan(dt.income)}</span>
                            </div>
                            <div className="expanse">
                                <div className="expanse-icon menu-icon">
                                    <img width="100%" src={expanse} alt="expanse" />
                                </div>
                                <span>{formatJutaan(dt.expanse)}</span>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
