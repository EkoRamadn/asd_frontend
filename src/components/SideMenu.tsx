import { Link } from "react-router-dom";
import profile from "../../public/assets/icons/avatar.png";
import "../style/sidemenu.css";

const SideMenu = () => {

    const avatar = localStorage.getItem('avatar')

    return (
        <aside className="side-menu">
            <div className="profile-menu">
                <img src={avatar ? `https://asd-backend.vercel.app/api/avatar/image?file=${encodeURIComponent(avatar)}` : profile} alt="Profile" />
                <Link to="" className="inria-sans-bold">{localStorage.getItem('username')}</Link>
            </div>
            <ul className="menu-links">
                <li className="inria-sans-regular"><Link to="/profile">Setting</Link></li>
                <li className="inria-sans-regular"><Link to="/contact">Kontak Kami</Link></li>
                <li className="inria-sans-regular"><Link to="/about">Tentang</Link></li>
            </ul>
        </aside>
    );
};

export default SideMenu;
