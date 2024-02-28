import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <NavLink to='/'><img src="/Pinterest-logo.png" alt='Logo' style={{width:"30px"}}/></NavLink>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">Explore</NavLink>
        </li>
        <li>
          <NavLink to="/pin-create">Create</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
