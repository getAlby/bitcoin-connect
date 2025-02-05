import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {init} from '@getalby/bitcoin-connect-react';
import Home from './pages/Home';
import BasicButtonDemo from './pages/BasicButtonDemo';
import PaymentButtonDemo from './pages/PaymentButtonDemo';

init({
  appName: 'Bitcoin Connect (React Demo)',
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic-button" element={<BasicButtonDemo />} />
        <Route path="/payment-button" element={<PaymentButtonDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
