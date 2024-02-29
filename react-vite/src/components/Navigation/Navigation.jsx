import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <div className="nav-bar">
        <div className="nav-bar-left">
          <div className="nav-bar-left-logo">
            <NavLink to="/pin">
              <img src="/Pinterest-logo.png" alt="Logo" style={{ width: "30px" }} />
            </NavLink>
          </div>
          <div className="nav-bar-left-links">
            <NavLink to="/pin">Home</NavLink>

            <div
              onClick={() => window.alert("Feature coming soon")}
              style={{ cursor: "pointer" }}
            >
              Explore
            </div>

            <NavLink to="/pin-creation-tool">Create</NavLink>

          </div>
        </div>
        <div className="nav-bar-right">
            <ProfileButton />
        </div>

      </div>
    </nav>
  );
}

export default Navigation;
