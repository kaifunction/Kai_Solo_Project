import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetPin } from "../../redux/pin";

const GetPin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
//   const navigate = useNavigate();

  // console.log("pinId====>", pinId);
  useEffect(() => {
    dispatch(thunkGetPin(pinId));
  }, [dispatch, pinId]);

  const pin = useSelector((state) => state.pins.pins[pinId]);
  if (!pin) return null;

//   console.log("pin from frontend===>", pin.pin_link);
  const pinImage = pin.pin_link;
  // console.log(pinImage)

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
    </div>
  );
};

export default GetPin;
