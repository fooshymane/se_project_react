import { useContext } from "react";
import logo from "../../assets/logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleOpenAddGarmentModal, handleOpenRegisterModal, handleOpenLoginModal, weatherData }) {
  const currentUser = useContext(CurrentUserContext);
  const now = new Date();
  const dateStr = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__side">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__place">
          <time className="header__datetime" dateTime={now}>
            {dateStr}
          </time>
          , {weatherData.city}
        </p>
      </div>
      <div className="header__side">
        <ToggleSwitch />
        {currentUser ? (
          <>
            <button onClick={handleOpenAddGarmentModal} className="header__add-clothes-btn">
              + Add clothes
            </button>
            <Link className="header__link" to="/profile">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={`${currentUser.name}'s avatar`}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "?"}
                </div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleOpenRegisterModal} type="button" className="header__auth-btn">
              Sign up
            </button>
            <button onClick={handleOpenLoginModal} type="button" className="header__auth-btn">
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}
    
    export default Header;
