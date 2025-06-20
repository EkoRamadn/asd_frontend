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
import NotFound from './page/NotFound';
import Contact from './page/Contact';

function App() {
  return (
    <Router>
      <Routes>
        {/* public */}
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />


        {/* Private */}
        <Route path='/' element={
          <PrivateRoute>
            <Beranda />
          </PrivateRoute>
        } />
        <Route path='/tambahpemasukan' element={
          <PrivateRoute>
            <TambahData />
          </PrivateRoute>
        } />
        <Route path='/pembelianbahan' element={
          <PrivateRoute>
            <Pembelianbahan />
          </PrivateRoute>
        } />
        <Route path='/history' element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        } />
        <Route path='/profile' element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

        <Route path='*' element={
          <NotFound />
        } />
      </Routes>
    </Router>
  );
}

export default App;
