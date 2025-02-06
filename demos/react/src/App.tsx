import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {init} from '@getalby/bitcoin-connect-react';
import Home from './pages/Home';
import BasicButtonDemo from './pages/BasicButtonDemo';
import PaymentButtonDemo from './pages/PaymentButtonDemo';
import ConnectDemo from './pages/ConnectDemo';
import PaymentDemo from './pages/PaymentDemo';

init({
  appName: 'Bitcoin Connect (React Demo)',
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic-button" element={<BasicButtonDemo />} />
        <Route path="/connect" element={<ConnectDemo />} />
        <Route path="/payment" element={<PaymentDemo />} />
        <Route path="/payment-button" element={<PaymentButtonDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
