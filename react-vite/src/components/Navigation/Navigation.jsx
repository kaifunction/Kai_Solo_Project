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
              <img src="/Pinterest-logo.png" alt="Logo" style={{ width: "30px" }} />
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
      {/* <div>
          <IoIosArrowForward className='nav-bar-arrow8'/>
          <IoIosArrowForward className='nav-bar-arrow7'/>
          <IoIosArrowForward className='nav-bar-arrow'/>
          <IoIosArrowForward className='nav-bar-arrow2'/>
          <IoIosArrowForward className='nav-bar-arrow3'/>
          <IoIosArrowForward className='nav-bar-arrow4'/>
          <IoIosArrowForward className='nav-bar-arrow5'/>
          <IoIosArrowForward className='nav-bar-arrow6'/>
        </div> */}
    </nav>
  );
}

export default Navigation;
