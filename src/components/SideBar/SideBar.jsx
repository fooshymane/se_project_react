import "./SideBar.css";
import avatar from "../../assets/avatar.svg"


function SideBar({ onSignOut }) {
    return (
      <div className="sidebar">
        <div className="sidebar__row">
        <img 
        src={avatar}
        alt="Terrence Tegegne's avatar"
        className="sidebar__avatar"
        />
        <p className="sidebar__username">Terremce Tegegne</p>
     </div>
        <button type="button" className="sidebar__sign-out" onClick={onSignOut}>
          Log out
        </button>
    </div>
    );
} 


export default SideBar