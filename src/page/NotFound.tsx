import { useLocation, Link } from 'react-router-dom';
import "../style/notfound.css"

const NotFound = () => {
    const location = useLocation();

    return (
        <div className='notfound ' style={{ padding: "2rem", textAlign: "center" }}>
            <h1>404</h1>
            <p>
                Halaman <code>{location.pathname}</code> tidak ditemukan
            </p>
            <Link to="/">Kembali ke beranda</Link>
        </div>
    );
};

export default NotFound;
