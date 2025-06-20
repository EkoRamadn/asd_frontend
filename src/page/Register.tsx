import { Link } from "react-router-dom";
import { useState } from "react";
import "../style/login.css";
import back from "../../public/assets/icons/back.png";
import Swal from "sweetalert2";
const baseURL = import.meta.env.VITE_API_URL;
import logo from "../../public/assets/icons/logo.png"

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirm = () => setShowConfirm(!showConfirm);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!username || !email || !password || !confirmPassword) {
            setError("Semua field wajib diisi ");
            return;
        }

        if (password !== confirmPassword) {
            setError("Password tidak cocok ");
            return;
        }


        const userData = {
            username,
            email,
            password,
        };

        console.log("User Register:", userData);


        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");

        try {
            const res = await fetch(`${baseURL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username, email: email, password: password }),
            })
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login gagal");
                return;
            }

            Swal.fire({
                title: "INFO",
                text: "Register Berhasil",
                icon: "success",
                confirmButtonText: "Ok!"
            });
            return;

        } catch (error) {
            Swal.fire({
                title: "INFO",
                text: `Register Gagal ${error}!`,
                icon: "error",
                confirmButtonText: "Ok!"
            });
            setError("Terjadi kesalahan server ");
        }
    };

    return (
        <div className="container register">
            <div className="login-container">
                <div className="back-login">
                    <Link to="/"><img src={back} alt="Kembali" /></Link>
                </div>

                <div className="login-header">
                    <div className="login-img"><img width="100%" src={logo} alt="logo" /></div>
                    <h1 className="login-describ">Buat akun anda.</h1>
                </div>

                <form className="form-login" onSubmit={handleSubmit}>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={togglePassword}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="password-wrapper last">
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type="button" onClick={toggleConfirm}>
                            {showConfirm ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button id="register" type="submit">Daftar</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
