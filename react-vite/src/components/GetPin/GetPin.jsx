import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetPin, thunkPostComment } from "../../redux/pin";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeletePin from "../DeletePin/DeletePin";
import { useModal } from "../../context/Modal";
// import CreateComment from "../CreateComment";

const GetPin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetPin(pinId));
  }, [dispatch, pinId]);

  const pin = useSelector((state) => state.pins.pins[pinId]);
  if (!pin) return null;
  const userId = pin.user.id;
  const currentUserId = currentUser?.id;
  const pinImage = pin.pin_link;

  // const isEditDisabled = !currentUserId || userId !== currentUserId;
  const shouldDisplayButtons = currentUserId && userId === currentUserId;
  // const updateComments = (newComments) => {
  //   setComments(newComments)
  // }
  const pinComments = pin.comments;
  console.log("pinCOMMENT FROM GETPIN===>", pinComments);

  function toEditPage(e) {
    e.preventDefault();
    navigate(`/pin/${pinId}/edit`);
  }

  function toEditComment(e) {
    e.preventDefault();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const errors = [];
    if (comment?.length > 255)
      errors.push("Comment needs to be less than 255 characters.");

    if (errors?.length > 0) {
      setErrors(errors);
      return;
    }

    const newComment = { comment };

    const updatingComments = await dispatch(
      thunkPostComment(pinId, newComment)
    );
    setComment("");
    pinComments.push(updatingComments);
  };

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
          <button>
            <OpenModalMenuItem
              itemText="Delete"
              modalComponent={<DeletePin />}
            />
          </button>
        </div>
      )}
      <div className="getPin-comment-container">
        <h4>Add a Comment</h4>
        <div className="pin-comment-input">
          <form onSubmit={handleSubmit} type="submit">
            <textarea
              placeholder="Write a comment for the song"
              type="text"
              maxLength="255"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: "500px", height: "100px" }}
            />
            <input
              type="submit"
              style={{
                cursor: "pointer",
                marginLeft: "20px",
                color: "#000433",
                border: "1.5px solid rgba(0, 4, 51, .3)",
              }}
            />
          </form>
        </div>

        <div className="getPin-comment">
          {pin.comments
            ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((comment) => (
              <div key={comment.id}>
                <p>• &nbsp;&nbsp;{comment.comment}</p>
                <div className="getPin-edit-delete-buttons">
                  {(comment.user.id === currentUserId) && (
                    <div>
                      <button onClick={toEditComment}>Edit Comment</button>
                      <button>
                        Delete Comment
                        {/* <OpenModalMenuItem
              itemText='Delete'
              modalComponent={<DeletePin />}
            /> */}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GetPin;
