import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetPin } from "../../redux/pin";

const GetPin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(thunkGetPin(pinId));
  }, [dispatch, pinId]);

  const pin = useSelector((state) => state.pins.pins[pinId]);
  const currentUser = useSelector((state) => state.session.user);
  if (!pin) return null;
  const userId = pin.user.id;
  const currentUserId = currentUser?.id;
  const pinImage = pin.pin_link;

  // const isEditDisabled = !currentUserId || userId !== currentUserId;
  const shouldDisplayButtons = currentUserId && userId === currentUserId;

  function toEditPage(e) {
    e.preventDefault();
    navigate(`/pin/${pinId}/edit`)

  }

  return (
    <div className="getPin-container">
      <div className="getPin-text">
        <p>
          {pin.title}
          <br />
          {pin.description}
        </p>
      </div>
      <div className="getPin-image">
        <img src={pinImage} alt="Pin image" style={{ width: "300px" }} />
      </div>
      {shouldDisplayButtons && (
        <div>
          <button onClick={toEditPage}>Edit</button>
          <button>Delete</button>
        </div>
      )}
      <div>
        <h4>Add a Comment</h4>
      </div>
    </div>
  );
};

export default GetPin;
