import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Bitcoin Connect React Demo</h1>
      <nav>
        <ul>
          <li>
            <Link to="/basic-button">Basic Button Demo</Link>
          </li>
          <li>
            <Link to="/payment-button">Payment Button Demo</Link>
          </li>
          <li>
            <Link to="/connect">Connect Component Demo</Link>
          </li>
          <li>
            <Link to="/payment">Payment Component Demo</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
