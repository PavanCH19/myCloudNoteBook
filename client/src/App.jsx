import About from './components/About';
import Footer from './components/Footer';
import Home from './components/home';
import Nav from './components/nav';

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
          </Routes>
          <Footer />
        </Router>
      </NoteContextProvider>
    </>
  );
}

export default App;