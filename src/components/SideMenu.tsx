import { Link } from "react-router-dom";
import profile from "../../public/assets/icons/avatar.png";
import "../style/sidemenu.css";

const SideMenu = () => {
    return (
        <aside className="side-menu">
            <div className="profile-menu">
                <img src={profile} alt="Profile" />
                <Link to="/profile" className="inria-sans-bold">{localStorage.getItem('username')}</Link>
            </div>
            <ul className="menu-links">
                <li className="inria-sans-regular"><Link to="/setting">Setting</Link></li>
                <li className="inria-sans-regular"><Link to="/kontak">Kontak Kami</Link></li>
                <li className="inria-sans-regular"><Link to="/tentang">Tentang</Link></li>
            </ul>
        </aside>
    );
};

export default SideMenu;
