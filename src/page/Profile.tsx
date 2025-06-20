import "../style/profile.css";
import back from "../../public/assets/icons/back.png";
import { useEffect, useRef, useState, useCallback } from "react";
import Cropper, { type Area } from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";
import { Link } from "react-router-dom";
import profile from "../../public/assets/icons/avatar.png";
import { type ProfileData } from "../interface/interface.";
import Swal from "sweetalert2";

const baseURL = import.meta.env.VITE_API_URL;



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
                const res = await fetch(`${baseURL}/getprofile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!res.ok) throw new Error("Gagal ambil profil");

                const data = await res.json();
                setDat(data[0]);
                if (data[0].avatar) {
                    localStorage.setItem('avatar', data[0].avatar)
                }


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
            const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
            const previewUrl = URL.createObjectURL(blob);
            setAvatar(previewUrl);
            setImageSrc(null);

            const formData = new FormData();
            formData.append("gambar", blob);

            const token = localStorage.getItem("token");

            const res = await fetch(`${baseURL}/avatar/uploadHandler`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) throw new Error("Upload gagal");

            const result = await res.json();
            setAvatar(`/assets/${result.filename}`);
            Swal.fire({
                title: "INFO",
                text: `Avatar Berhasil diubah.`,
                icon: "success",
                confirmButtonText: "Ok!",
                confirmButtonColor: "#299CD3"
            }).then(() => {
                location.reload();
            });
        } catch (err) {
            console.error("Upload avatar error:", err);
            Swal.fire({
                title: "INFO",
                text: `Avatar gagal diubah.`,
                icon: "error",
                confirmButtonText: "Ok!",
                confirmButtonColor: "#299CD3"
            });
        } finally {
            setUploading(false);
        }
    };

    const openFilePicker = () => inputRef.current?.click();

    return (
        <div className="profile">
            <div className="profile-container">


                <div className="profile-head">
                    <div className="head-nav">
                        <Link className="back" to="/">
                            <img src={back} alt="Back" />
                        </Link>
                        <h2 className="inria-sans-regular">Profile</h2>
                    </div>

                    <div className="info">
                        <div className="content">
                            <div className="img" onClick={openFilePicker}>
                                <img
                                    src={
                                        avatar ??
                                        (dat?.file
                                            ? `https://asd-backend.vercel.app/api/avatar/image?file=${encodeURIComponent(dat.file)}`
                                            : profile)
                                    }
                                    alt="Avatar"
                                />
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
