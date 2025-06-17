import "../style/profile.css";
import back from "../../public/assets/icons/back.png";
import { useEffect, useRef, useState, useCallback } from "react";
import Cropper, { type Area } from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // fungsi versi Blob
import { Link } from "react-router-dom";

interface ProfileData {
    username: string;
    email: string;
    file?: string;
}

const Profile = () => {
    const [dat, setDat] = useState<ProfileData | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [zoom, setZoom] = useState<number>(1);
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [uploading, setUploading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/getprofile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!res.ok) throw new Error("Gagal ambil profil");

                const data = await res.json();
                setDat(data[0]);

                // Tampilkan avatar jika ada
                if (data[0].avatar) {
                    setAvatar(`/assets/${data[0].avatar}`);
                }
            } catch (error) {
                console.error("Gagal ambil data profil:", error);
            }
        };

        fetchProfile();
    }, []);

    const onCropComplete = useCallback((_: Area, cropped: Area) => {
        setCroppedAreaPixels(cropped);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const cropImage = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        setUploading(true);

        try {
            const blob = await getCroppedImg(imageSrc, croppedAreaPixels); // blob image
            const previewUrl = URL.createObjectURL(blob);
            setAvatar(previewUrl); // Preview sementara
            setImageSrc(null); // Tutup modal crop

            const formData = new FormData();
            formData.append("gambar", blob); // ✅ sesuai backend field: 'gambar'

            const token = localStorage.getItem("token");

            const res = await fetch("/api/avatar/uploadHandler", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) throw new Error("Upload gagal");
            const result = await res.json();

            // Setelah simpan, tampilkan avatar dari server
            setAvatar(`/assets/${result.filename}`);
            alert("Avatar berhasil disimpan! 🎉");
        } catch (err) {
            console.error("Upload avatar error:", err);
            alert("Gagal menyimpan avatar 😢");
        } finally {
            setUploading(false);
        }
    };

    const openFilePicker = () => inputRef.current?.click();

    return (
        <div className="profile">
            <div className="profile-container">
                <Link className="back" to="/">
                    <img src={back} alt="Back" />
                </Link>

                <div className="profile-head">
                    <h2 className="inria-sans-regular">Profile</h2>
                    <div className="info">
                        <div className="content">
                            <div className="img" onClick={openFilePicker}>
                                <img src={avatar || `https://asd-backend.vercel.app/api/avatar/image?file=${dat?.file}` || "/default-avatar.png"} alt="Avatar" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div className="describ">
                                <p className="inria-sans-regular">
                                    {dat ? dat.username : "Loading..."}
                                </p>
                                <p className="inria-sans-regular">perusahaan</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-body">
                    <p className="inria-sans-regular">
                        {dat ? dat.email : "Email belum dimuat"}
                    </p>
                    <p className="inria-sans-regular">
                        <Link to="">Pusat Bantuan</Link>
                    </p>
                    <p className="inria-sans-regular">
                        <Link to="">Tentang</Link>
                    </p>
                </div>
            </div>

            {imageSrc && (
                <div className="modal-crop-container">
                    <div className="modal-crop">
                        <div className="cropper-container">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                        />
                        <div className="btn-group">
                            <button onClick={() => setImageSrc(null)} disabled={uploading}>
                                Batal
                            </button>
                            <button onClick={cropImage} disabled={uploading}>
                                {uploading ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
