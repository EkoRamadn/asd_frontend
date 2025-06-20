
import { Link } from 'react-router-dom';
import back from "../../public/assets/icons/back.png"
import "../style/about.css"


const About = () => {
  return (
    <div className='about container'>

      <div className="title">
        <Link to="/">
          <img src={back} alt="" />
        </Link>
        <h2>Tentang</h2>
      </div>

      <div className="about-body">
        <p>MyIncome adalah sebuah aplikasi web berbasis manajemen keuangan pribadi yang bertujuan untuk membantu pengguna dalam mencatat, mengatur, dan memantau pemasukan serta pengeluaran secara terstruktur setiap bulan. Aplikasi ini dikembangkan untuk memberikan solusi sederhana namun efektif dalam mengelola keuangan sehari-hari, agar pengguna dapat lebih bijak dalam merencanakan dan mengontrol kondisi finansial mereka</p>
        <p>Dalam pengembangannya, MyIncome menekankan pada kemudahan penggunaan dan tampilan antarmuka yang user-friendly. Setiap fitur dirancang agar dapat diakses oleh siapa saja, baik pengguna yang sudah terbiasa dengan aplikasi keuangan maupun pemula.</p>
      </div>
    </div>
  );
}

export default About;
