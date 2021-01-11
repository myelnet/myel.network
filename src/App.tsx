import React, {Suspense, lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

import Nav from './components/Nav';
import Footer from './components/Footer';
import PageSkeleton from './PageSkeleton';
const Home = lazy(() => import('./Home'));
const SignUp = lazy(() => import('./SignUp'));

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
