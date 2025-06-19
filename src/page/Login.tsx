import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/login.css";
import Swal from "sweetalert2";
const baseURL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
        console.log(baseURL)
    })


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email dan password wajib diisi ");
            return;
        }

        try {
            const res = await fetch(`${baseURL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login gagal");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            window.location.href = "/";
        } catch (err) {
            console.error("Gagal login:", err);
            setError("Terjadi kesalahan server ");
            Swal.fire({
                title: "INFO",
                text: `Login Gagal ${error}!`,
                icon: "error",
                confirmButtonText: "Ok!"
            });
        }
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className="container login">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-img"><img src="" alt="" /></div>
                    <h1 className="login-describ">Login Ke Akun Anda</h1>
                </div>

                <form className="form-login" onSubmit={handleSubmit}>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="password-wrapper last">
                        <input
                            className=""
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            style={{ marginLeft: "0.5rem" }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button type="submit">Masuk</button>
                </form>

                <p className="describ-login">
                    Belum memiliki akun? <Link to="/register">Daftar</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
