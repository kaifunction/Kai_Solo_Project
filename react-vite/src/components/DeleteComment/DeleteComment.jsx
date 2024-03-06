import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { useParams } from "react-router-dom";
import { thunkDeleteComment, thunkGetPin } from "../../redux/pin";

const DeleteComment = ({ commentId }) => {
     const { closeModal } = useModal();
     const dispatch = useDispatch();
     const { pinId } = useParams();

     console.log('COMMENTID FROM DELETE=====>', commentId)

     const handleDeleteButtonClick = async (e) => {
          e.preventDefault();
          await dispatch(thunkDeleteComment(pinId, commentId));
          await dispatch(thunkGetPin(pinId));
          closeModal();
     };

     const keepPin = (e) => {
          e.preventDefault();
          closeModal();
     };

     return (
          <>
      <form className="DeleteComment">
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this Comment?</h3>
        <button onClick={handleDeleteButtonClick}>Yes (Delete Comment)</button>
        <button onClick={keepPin}>No (Keep Comment)</button>
      </form>
    </>
     )
}

export default DeleteComment;
