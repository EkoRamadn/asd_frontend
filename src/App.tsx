import './style/reset.css';
import './style/font.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Beranda from './page/Beranda';
import About from './page/About';
import Login from './page/Login';
import PrivateRoute from './components/PrivateRoute'; // Buat file ini
import Register from './page/Register';
import History from './page/History';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        {/* <Route path='/' element={<Beranda />} /> */}
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/history' element={<History />} />
        <Route path='/' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />

        {/* Private */}
        <Route path='/beranda' element={
          <PrivateRoute>
            <Beranda />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
