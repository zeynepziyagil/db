import HermesLogo from './img/thelogo.png';
import './App.css';

function Logo() {
  return (
    <div className='logom'>
      <img src={HermesLogo} className="logohead" alt="logo"/>
      <h1 className='hermes'> Hermes</h1>
    </div>
  );
}

export default Logo;
