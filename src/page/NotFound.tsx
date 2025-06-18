import { useLocation, Link } from 'react-router-dom';

const NotFound = () => {
    const location = useLocation();

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>404</h1>
            <p>
                Halaman <code>{location.pathname}</code> tidak ditemukan
            </p>
            <Link to="/">Kembali ke beranda</Link>
        </div>
    );
};

export default NotFound;
