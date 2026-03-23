import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Gallery from './pages/Gallery';
import './styles/tokens.css';

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/ubicaciones" element={<Locations />} />
        <Route path="/galeria" element={<Gallery />} />
      </Routes>
      <Footer />
    </>
  );
}
