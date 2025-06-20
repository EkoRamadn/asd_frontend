import './../style/beranda.css';
import incomeIcon from "../../public/assets/icons/income.png";
import expanseIcon from "../../public/assets/icons/expanse.png";
import { useEffect, useState } from 'react';
import { type DataType } from '../interface/interface.';
import { getDataWeek } from '../utils/dataWeek';
import { useData } from '../context/DataContext';


interface HistoryListProps {
    data: DataType[] | [];
    isWeek: boolean;
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

export const HistoryList = ({ data, isWeek }: HistoryListProps) => {
    const [displayData, setDisplayData] = useState<DataType[] | []>(data);
    const { setDatedata } = useData();

    function ubahFormatTanggal(input: string): string {
        const parts = input.trim().split(" ");
        if (parts.length !== 2) return "";

        const [tanggalStr, bulanStr, tahunStr] = parts[1].split("-");

        const tanggal = tanggalStr.padStart(2, "0");
        const bulan = bulanStr.padStart(2, "0");
        const tahun = tahunStr;

        return `${tahun}-${bulan}-${tanggal}`;
    }

    function hadleClick(date: string) {
        document.getElementById('detail')?.classList.add('show');
        const tmp = ubahFormatTanggal(date)
        setDatedata(tmp)
    }


    useEffect(() => {
        if (isWeek) {
            const finalData = getDataWeek(data);
            setDisplayData(finalData);
        } else {
            setDisplayData(data);
        }
    }, [data, isWeek]);

    if (!displayData.length) {
        return (
            <p className="inria-sans-regular xl">Tidak ada data untuk ditampilkan </p>
        );
    }

    return (
        <ul className="history-data-container">
            {displayData.map(({ id, date, income, expanse }) => (
                <li key={id} className=" history1" onClick={() => hadleClick(date)}>
                    <div className="history-item" >
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
