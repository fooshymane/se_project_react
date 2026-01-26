import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import "./Header.css";


function Header() {
    const now = new Date();
    const dateStr = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="WTWR logo" className="header__logo" />
      <p className="header__place">
      <time className="header__datetime" dateTime={now}>
      {dateStr}
      </time>
      , New York
      </p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <p className="header__username">Terrance Tegegne</p>
      <img src={avatar} alt="Terrance Tegegne's avatar" className="header__avatar" />
      </header>
  )};
    export default Header;
