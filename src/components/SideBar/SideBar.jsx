import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__row">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={`${currentUser.name ?? "User"}'s avatar`}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "?"}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name ?? "..."}</p>
      </div>
      <button type="button" className="sidebar__update-profile" onClick={onEditProfile}>
        Change profile data
      </button>
      <button type="button" className="sidebar__sign-out" onClick={onSignOut}>
        Log out
      </button>
    </div>
  );
} 


export default SideBar