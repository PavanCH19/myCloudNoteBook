import About from './components/About';
import Footer from './components/Footer';
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/login';
import './App.css';
import UserDashboard from './components/userDashboard';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteContextProvider from './contaxtApi/NoteContextProvider';
import ResetPassword from './components/resetPassword';

const App = () => {
  return (
    <>
      <NoteContextProvider >
        <Router>
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/password-reset' element={<ResetPassword />} />
            <Route path='/userDashboard' element={<UserDashboard />} />
          </Routes>
          <Footer />
        </Router>
      </NoteContextProvider>
    </>
  );
}

export default App;