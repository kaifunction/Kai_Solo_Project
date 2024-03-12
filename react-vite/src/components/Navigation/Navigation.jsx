import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import {IoIosArrowForward} from 'react-icons/io'
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <div className="nav-bar">
        <div className="nav-bar-left">
          <div className="nav-bar-left-logo">
            <NavLink to="/">
              <img src="/VibiVisionlogoRed-White.png" alt="Logo" style={{ width: "50px", height:'45px' }} />
            </NavLink>
          </div>
          <div className="nav-bar-left-links">
            <NavLink to="/pin" className='nav-bar-button' style={{textDecoration:'none'}}>Home</NavLink>

            <div className='nav-bar-button'
              onClick={() => window.alert("Feature coming soon")}
              style={{ cursor: "pointer" }}
            >
              Explore
            </div>

            <NavLink to="/pin-creation-tool" style={{textDecoration:'none'}}><div className='nav-bar-button'>Create</div></NavLink>

          </div>
        <input placeholder="Search" onClick={() => window.alert("Feature coming soon")} className="search-bar"/>
        </div>

        <div className="nav-bar-right">
            <ProfileButton />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
