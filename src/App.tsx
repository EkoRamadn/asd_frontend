import './style/reset.css';
import './style/font.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Beranda from './page/Beranda';
import About from './page/About';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Beranda />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
