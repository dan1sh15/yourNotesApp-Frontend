import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-[100vh] relative h-auto bg-[#e6e3ff] poppins-medium">
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/update-password/:id' element={<ResetPassword />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
