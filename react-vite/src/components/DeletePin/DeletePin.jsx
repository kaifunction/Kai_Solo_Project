import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeletePin } from "../../redux/pin";
import { useNavigate, useParams } from "react-router-dom";

const DeletePin = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{ pinId } = useParams();

  console.log("pinId FROM DELETE PAGE===>", pinId)

  const deletePin = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeletePin(pinId));
    navigate("/pin");
    closeModal();
  };

  const keepPin = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      <form className="DeleteForm">
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this Song?</h3>
        <button onClick={deletePin}>Yes (Delete Song)</button>
        <button onClick={keepPin}>No (Keep Song)</button>
      </form>
    </>
  );
};

export default DeletePin;
