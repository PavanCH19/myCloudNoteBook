import About from './components/About';
import Footer from './components/Footer';
import Home from './components/Home';
import Nav from './components/nav';
// import LoginSignup from './components/loginSignup';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteContextProvider from './contaxtApi/NoteContextProvider';

const App = () => {
  return (
    <>
      <NoteContextProvider >
        <Router>
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
            {/* <Route path='/login' element={<LoginSignup />} /> */}
          </Routes>
          <Footer />
        </Router>
      </NoteContextProvider>
    </>
  );
}

export default App;