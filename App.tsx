import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="max-w-screen-xl mx-auto min-h-screen shadow-2xl bg-white overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;