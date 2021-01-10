import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './Home';
import SignUp from './SignUp';

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}
