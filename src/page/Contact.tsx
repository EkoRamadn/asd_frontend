import { Link } from "react-router-dom"
import back from "../../public/assets/icons/back.png"
import "../style/about.css"
import profileimg from "../../public/assets/icons/avatar.png"

const Contact = () => {
    return (
        <div className="contact container">
            <div className="title">
                <Link to="/">
                    <img src={back} alt="" /></Link>
                <h2>Pusat Bantuan</h2>
            </div>

            <div className="contact-body">
                <ul>
                    <li>
                        <Link to="">
                            <div className="avatar">
                                <img width="100% " height="100%" src={profileimg} alt="" />
                            </div>
                            <span>CAHYO SAPUTRA</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <div className="avatar">
                                <img width="100% " height="100%" src={profileimg} alt="" />
                            </div>
                            <span>ACHMAD FERDINAND</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <div className="avatar">
                                <img width="100% " height="100%" src={profileimg} alt="" />
                            </div>
                            <span>SHELLA ALRANTISI</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <div className="avatar">
                                <img width="100% " height="100%" src={profileimg} alt="" />
                            </div>
                            <span>Eko Ramadani</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Contact