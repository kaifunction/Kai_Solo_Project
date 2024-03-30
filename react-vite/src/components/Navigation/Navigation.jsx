import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { IoIosArrowForward } from "react-icons/io";
import "./Navigation.css";

function Navigation() {
  const pinReducerState = useSelector((state) => state.pins);
  console.log("pinREDUCERSTATE==========>", pinReducerState);
  const userReducerState = useSelector((state) => state.session.user);
  console.log("userReducerState==========>", userReducerState);

  //确保userReducerState存在

  return (
    <nav>
      <div className="nav-bar">
        <div className="nav-bar-left">
          <div className="nav-bar-logo-link">
            <div className="nav-bar-left-logo">
              <NavLink to="/">
                <img
                  src="/Vibevision.png"
                  alt="Logo"
                  className="nav-bar-left-logo"
                />
              </NavLink>
            </div>
            <div className="nav-bar-left-links">
              <NavLink
                to="/pin"
                className="nav-bar-button"
                style={{ textDecoration: "none" }}
              >
                Home
              </NavLink>

              <NavLink
                to="/boards"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="nav-bar-button"
                  // onClick={() => window.alert("Feature coming soon")}
                  style={{ cursor: "pointer" }}
                >
                  Boards
                </div>
              </NavLink>

              <NavLink
                to="/pin-creation-tool"
                style={{ textDecoration: "none" }}
              >
                <div className="nav-bar-button">Create</div>
              </NavLink>
            </div>
          </div>
          <div className="nav-bar-search-bar">
            <input
              placeholder="Search"
              onClick={() => window.alert("Feature coming soon")}
              className="search-bar"
            />
            <button className="search-bar-button" style={{padding:'0', marginLeft:'10px'}}>SEARCH</button>
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
