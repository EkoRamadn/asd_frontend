import './style/reset.css';
import './style/font.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Beranda from './page/Beranda';
import About from './page/About';
import Login from './page/Login';
import PrivateRoute from './components/PrivateRoute'; // Buat file ini
import Register from './page/Register';
import History from './page/History';
import Profile from './page/Profile';
import TambahData from './page/TambahData';
import Pembelianbahan from './page/Pembelianbahan';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        {/* <Route path='/' element={<Beranda />} /> */}
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/history' element={<History />} />
        <Route path='/pembelianbahan' element={<Pembelianbahan />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/tambahpemasukan' element={<TambahData />} />
        {/* <Route path='/detail/:date' element={<></>} /> */}

        {/* Private */}
        <Route path='/' element={
          <PrivateRoute>
            <Beranda />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
