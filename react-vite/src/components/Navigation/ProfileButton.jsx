import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const userFirstLetter = user?.username[0]?.toUpperCase()

  return (
    <>
      <button onClick={toggleMenu} className="login-signup-button">
        {userFirstLetter? userFirstLetter : <FaUser style={{color:'#000000'}}/>}
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} style={{paddingTop:'20px'}} ref={ulRef}>
          {user ? (
            <>
              <h3 style={{color:'#ff2f00'}}>{user.username}</h3>
              <h3 style={{color:'#ff2f00', paddingBottom:'10px'}}>{user.email}</h3>
              <button onClick={logout} >Log Out</button>
            </>
          ) : (
            <div className="logIn-signUp">
              <button style={{display:'flex', flexDirection:'row', justifyContent: 'center'}}>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              </button>
              <button style={{display:'flex', flexDirection:'row', justifyContent: 'center'}}>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />

              </button>
            </div>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
