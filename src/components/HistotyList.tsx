import './../style/beranda.css';
import incomeIcon from "../../public/assets/icons/income.png";
import expanseIcon from "../../public/assets/icons/expanse.png";
import { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';

interface DataType {
    id: number;
    date: string; // format: "Senin 09-06-2025"
    income: number;
    expanse: number;
}

interface HistoryListProps {
    data?: DataType[];
}

const AmountItem = ({
    icon,
    label,
    amount,
}: {
    icon: string;
    label: string;
    amount: number;
}) => (
    <div className={label}>
        <div className={`${label}-icon menu-icon`}>
            <img width="100%" src={icon} alt={label} />
        </div>
        <span>{`${(amount / 1_000_000).toFixed(1)} JT`}</span>
    </div>
);

export const HistoryList = ({ data }: HistoryListProps) => {
    const [displayData, setDisplayData] = useState<DataType[]>([]);
    const { setDataisWeek } = useData();

    const parseDate = (dateStr: string): Date => {
        const tanggal = dateStr.split(" ")[1]; // "09-06-2025"
        const [day, month, year] = tanggal.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    useEffect(() => {
        if (!data) return;

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const recent = data.filter((dt) => {
            const date = parseDate(dt.date);
            return date >= sevenDaysAgo && date <= today;
        });

        let finalData: DataType[];

        if (recent.length > 0) {
            finalData = recent;
        } else {
            const closest = data
                .map((dt) => {
                    const date = parseDate(dt.date);
                    if (date < today) {
                        return {
                            ...dt,
                            distance: Math.abs(today.getTime() - date.getTime()),
                        };
                    }
                    return null;
                })
                .filter((d): d is DataType & { distance: number } => d !== null)
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 7);

            finalData = closest;
        }

        setDisplayData(finalData);
        setDataisWeek(finalData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (!displayData.length) {
        return (
            <p className="inria-sans-regular xl">Tidak ada data untuk ditampilkan 😢</p>
        );
    }

    return (
        <ul className="history-data-container">
            {displayData.map(({ id, date, income, expanse }) => (
                <li key={id} className="fade-in">
                    <div className="history-item">
                        <div className="inria-sans-regular xl history-rigth">
                            <span>{date}</span>
                        </div>
                        <div className="inria-sans-regular xl history-left">
                            <AmountItem icon={incomeIcon} label="income" amount={income} />
                            <AmountItem icon={expanseIcon} label="expanse" amount={expanse} />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
