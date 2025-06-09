import income from "../../public/assets/icons/income.png"
import extense from "../../public/assets/icons/expanse.png"
import { HistoryList } from "../components/HistotyList"
import back from "../../public/assets/icons/back.png"
import { useData } from "../context/DataContext"
import "../style/history.css"
import { Link } from "react-router-dom"

const History = () => {
    const { data } = useData()
    return (
        <div className='container history'>
            <div className="history-header">
                <div className="title">
                    <Link to="/">
                        <img src={back} alt="" /></Link>
                    <h1>History</h1>
                </div>

                <div className="info">
                    <div className="history-left">
                        <div className='pemasukan item'>
                            <span>Pemasukan</span>
                            <span>20.6 JT</span>
                        </div>
                        <div>
                            <img src={income} alt="" />
                        </div>
                    </div>
                    <div className="history-right">
                        <div className='pengeluaran item'>
                            <span>Pengeluaran</span>
                            <span>20.6 JT</span>
                        </div>
                        <div>
                            <img src={extense} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="history-body">
                <div className="history-filter">
                    <form action="">
                        <input type="date" name="" id="" />
                        <button>Filter</button>
                    </form>

                </div>
                <HistoryList data={data} />
            </div>
        </div>
    )
}

export default History