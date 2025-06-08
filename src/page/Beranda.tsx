import { useEffect, useRef, useState } from "react";
import menu from "../../public/assets/icons/menu-bar.png";
import nontif from "../../public/assets/icons/nontif.png";
import income from "../../public/assets/icons/income.png";
import expanse from "../../public/assets/icons/expanse.png";
import "../style/beranda.css";
import SideMenu from "../components/SideMenu";
import { useData } from "../context/DataContext";
import { HistoryList } from "../components/HistotyList";
import MyBarChart from "../components/chart";

const Beranda = () => {

    const { data } = useData();
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        const menu = sideMenuRef.current;
        if (menu) {
            menu.classList.toggle("active");
            setMenuActive(menu.classList.contains("active"));
        }
    };
    useRef(() => {
        console.log(data)
    })

    const closeMenu = () => {
        const menu = sideMenuRef.current;
        if (menu && menu.classList.contains("active")) {
            menu.classList.remove("active");
            setMenuActive(false);
        }
    };

    useEffect(() => {
        const items = document.querySelectorAll('.fade-in');
        console.log(items)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        target.classList.add('show');
                        // Bisa hapus observer kalau hanya ingin sekali tampil
                        observer.unobserve(target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        items.forEach((el) => observer.observe(el));
    }, []);

    return (
        <div className="container">
            {/* Pass ref ke SideMenu */}
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
                            <h1 className="inria-sans-regular l">Hello Anonim</h1>
                            <h2 className="inria-sans-regular xl">
                                {new Date().toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
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
                        <div className="income-icon menu-icon">
                            <img src={income} alt="" />
                        </div>
                        <div className="expanse-icon menu-icon">
                            <img src={expanse} alt="" />
                        </div>
                    </div>

                </div>
                <div className="history">
                    <h2 className="title-header inria-sans-regular xl">History</h2>
                    <HistoryList data={data} />
                </div>
            </section>
        </div>
    );
};

export default Beranda;
