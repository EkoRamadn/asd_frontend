import incomeIcon from "../../public/assets/icons/income.png"
import expenseIcon from "../../public/assets/icons/expanse.png"
import back from "../../public/assets/icons/back.png"
import "../style/history.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { HistoryList } from "../components/HistotyList"
import { useData } from "../context/DataContext"
import { Dataquery } from "../lib/Dataquery"
import Loading from "../components/Loading"

const namaBulan: string[] = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const History = () => {
    const { data } = useData();
    const [ttlIncome, setTtlIncome] = useState<number>(0)
    const [ttlExpense, setTtlExpense] = useState<number>(0)

    const [bulan, setBulan] = useState<number>(new Date().getMonth() + 1);
    const [tahun, setTahun] = useState<number>(new Date().getFullYear());
    const [filteredData, setFilteredData] = useState(data);
    const [loading, setLoading] = useState(false);

    const sortByIncomeDescending = () => {
        const sorted = [...filteredData];
        for (let i = 0; i < sorted.length - 1; i++) {
            for (let j = 0; j < sorted.length - i - 1; j++) {
                if ((sorted[j].income || 0) < (sorted[j + 1].income || 0)) {
                    [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                }
            }
        }
        setFilteredData(sorted);
    };

    const sortByExpenseDescending = () => {
        const sorted = [...filteredData];
        for (let i = 0; i < sorted.length - 1; i++) {
            for (let j = 0; j < sorted.length - i - 1; j++) {
                if ((sorted[j].expanse || 0) < (sorted[j + 1].expanse || 0)) {
                    [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                }
            }
        }
        setFilteredData(sorted);
    };

    useEffect(() => {
        const totalIncome = filteredData.reduce((sum, dt) => sum + (dt.income || 0), 0)
        const totalExpense = filteredData.reduce((sum, dt) => sum + (dt.expanse || 0), 0)
        setTtlIncome(totalIncome)
        setTtlExpense(totalExpense)
    }, [filteredData])

    const handleFilter = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            setLoading(true);
            const date = new Date(tahun, bulan - 1);
            const validBulan = date.getMonth();
            const validTahun = date.getFullYear();
            const result = await Dataquery.getData(validBulan, validTahun, token);
            setFilteredData(result);
            console.log(result);
            setLoading(false);
        }
    }

    return (
        <div className='container history'>
            <div className="history-header">
                <div className="title">
                    <Link to="/">
                        <img src={back} alt="Back" />
                    </Link>
                    <h1>History</h1>
                </div>

                <div className="info">
                    <div className="history-left">
                        <div className='pemasukan item'>
                            <span>Pemasukan</span>
                            <span>{`${(ttlIncome / 1_000_000).toFixed(1)} JT`}</span>
                        </div>
                        <div>
                            <img src={incomeIcon} alt="Income" />
                        </div>
                    </div>
                    <div className="history-right">
                        <div className='pengeluaran item'>
                            <span>Pengeluaran</span>
                            <span>{`${(ttlExpense / 1_000_000).toFixed(1)} JT`}</span>
                        </div>
                        <div>
                            <img src={expenseIcon} alt="Expense" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="history-body">
                <div className="history-filter">
                    <form onSubmit={handleFilter}>
                        <select
                            name="bulan"
                            value={bulan}
                            onChange={(e) => setBulan(Number(e.target.value))}
                            required
                        >
                            {namaBulan.map((nama, idx) => (
                                <option key={idx} value={idx + 1}>{nama}</option>
                            ))}
                        </select>

                        <input
                            type="number"
                            name="tahun"
                            value={tahun}
                            min={2000}
                            onChange={(e) => setTahun(Number(e.target.value))}
                            placeholder="Tahun"
                            required
                        />
                        <button type="submit">Filter</button>
                    </form>
                </div>

                {loading ? (
                    <div className="loadinghistory "><Loading /></div>
                ) : (
                    <HistoryList data={filteredData} isWeek={false} />
                )}
                <div className="floating-buttons">
                    <button onClick={sortByIncomeDescending}>Urut Income 🔼</button>
                    <button onClick={sortByExpenseDescending}>Urut Expense 🔼</button>
                </div>
            </div>
        </div>
    )
}

export default History;
