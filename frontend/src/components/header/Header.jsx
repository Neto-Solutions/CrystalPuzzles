import logo from "../../assets/img/logo.png";
import "./Header.scss";

export default function Header() {
  return (
    <header className='header'>
      <div>
        <img className='logo' src={logo} alt='Logo' />
      </div>
    </header>
  );
}
