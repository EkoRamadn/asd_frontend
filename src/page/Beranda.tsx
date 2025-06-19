import { useRef, useState, useEffect } from "react";
import menu from "../../public/assets/icons/menu-bar.png";
import nontif from "../../public/assets/icons/nontif.png";
import income from "../../public/assets/icons/income.png";
import expanse from "../../public/assets/icons/expanse.png";
import "../style/beranda.css";
import SideMenu from "../components/SideMenu";
import { useData } from "../context/DataContext";
import { HistoryList } from "../components/HistotyList";
import MyBarChart from "../components/chart";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Beranda = () => {
    const { data, loading } = useData();
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        if (data && data.length > 0) {
            const timeout = setTimeout(() => {
                // Show content after 1 second if data is loaded
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [data]);

    const toggleMenu = () => {
        const menu = sideMenuRef.current;
        if (menu) {
            menu.classList.toggle("active");
            setMenuActive(menu.classList.contains("active"));
        }
    };

    const closeMenu = () => {
        const menu = sideMenuRef.current;
        if (menu && menu.classList.contains("active")) {
            menu.classList.remove("active");
            setMenuActive(false);
        }
    };

    if (loading) {
        return <div className="load containerin"><Loading /></div>;
    }

    return (
        <div className="container beranda">
            {menuActive && <div className="backdrop" onClick={closeMenu} />}
            <div className="side" ref={sideMenuRef}>
                <SideMenu />
            </div>

            <section>
                <div className="header">
                    <div className="menu-header">
                        <div className="header-icon" id="menu" onClick={toggleMenu}>
                            <img src={menu} alt="menu-icon" />
                        </div>
                        <div className="menu-describ">
                            <h1 className="inria-sans-regular l">
                                Hello {localStorage.getItem("username")}
                            </h1>
                            <h2 className="inria-sans-regular xl">
                                {new Date().toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </h2>
                        </div>
                    </div>
                    <div className="nontif-icon header-icon">
                        <img src={nontif} alt="nontif-icon" />
                    </div>
                </div>

                <div>
                    <MyBarChart />
                </div>

                <div className="menu">
                    <h2 className="title-header inria-sans-regular xl">Menu</h2>
                    <div className="menu-container">
                        <Link to="/tambahpemasukan">
                            <div className="income-icon menu-icon">
                                <img src={income} alt="income-icon" />
                            </div>
                        </Link>
                        <Link to="/pembelianbahan">
                            <div className="expanse-icon menu-icon">
                                <img src={expanse} alt="expanse-icon" />
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="history">
                    <h2 className="title-header inria-sans-regular xl">History</h2>
                    <HistoryList data={data} isWeek={true} />
                    <Link to="/history">Selengkapnya</Link>
                </div>
            </section>
        </div>
    );
};

export default Beranda;
