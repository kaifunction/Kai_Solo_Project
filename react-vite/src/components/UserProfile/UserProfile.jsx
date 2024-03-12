import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetPins } from "../../redux/pin";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const allPins = useSelector((state) => state.pins.pins);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = user?.id;
  const pinArray = Object.values(allPins);
  // console.log('PIN ARRAY FROM USER PROFILE=====>', pinArray)

  // console.log("USERID FROM PROFILE BUTTON=====>", userId)

  const currentUserPins = pinArray.filter((pin) => {
    if (pin?.user_id === userId) {
      return pin;
    }
  });

  useEffect(() => {
    dispatch(thunkGetPins());
  }, [dispatch]);

  useEffect(() => {
    const asyncLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    asyncLoad();
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {userId ? (
        <>
          {isLoading ? (
            <h1 className="loading-spinner">Loading...</h1>
          ) : (
            <div className="allPins-container">
              {showScrollButton && (
                <button
                  className="scrollToTopButton"
                  onClick={handleScrollToTop}
                >
                  Back to Top
                </button>
              )}
              {currentUserPins.map((pin) => (
                <div key={pin.id} className="allPins-eachpin">
                  <NavLink key={pin.id} to={`/pin/${pin.id}/`}>
                    <img src={pin.pin_link} />
                    <div className="pinTitle">{pin.title}</div>
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <h3
          style={{
            padding: "100px 40px",
            color: "#ff00bb",
            fontWeight: "normal",
            fontSize: "24px",
          }}
        >
          Please Log in or Sign up first...
        </h3>
      )}
    </>
  );
};

export default UserProfile;
