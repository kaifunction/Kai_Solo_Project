import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  thunkEditComment,
  thunkGetPin,
  thunkPostComment,
  editComment,
} from "../../redux/pin";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeletePin from "../DeletePin/DeletePin";
import { useModal } from "../../context/Modal";

const GetPin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentId, setCommentId] = useState(-1);
  const [managementButton, setManagementButton] = useState(false);
  const [isManagementButtonVisible, setIsManagementButtonVisible] =
    useState(true);
  const [isEditing, setIsEditing] = useState(false);
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


  const shouldDisplayButtons = currentUserId && userId === currentUserId;

  const pinComments = pin.comments;

  function toEditPage(e) {
    e.preventDefault();
    navigate(`/pin/${pinId}/edit`);
  }

  const toEditComment = async (commentId, commentText) => {
    const edited = {
      id: commentId,
      comment: commentText,
    };

    const response = await dispatch(thunkEditComment(pinId, edited));
    console.log("RESPONSE FROM EDIT COMMENT BACK====>", response);
    dispatch(editComment(response));
    setCommentId(-1);
    closeModal();
  };

  // Edit Comment button
  const handleEditButtonClick = (comment) => {
    setCommentId(comment.id);
    setCommentText(comment.comment);
    setIsEditing(true);

    console.log("COMMENTID======>", comment.id);
  };

  // Delete Comment button

  // Back button
  const backToPin = (e) => {
    e.preventDefault();
    setIsManagementButtonVisible(true);
    setManagementButton(false);
    setIsEditing(false);
  };


  // Add Post comment submit button
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


  // Management button
  const handleManagementButtonClick = () => {
    setManagementButton(!managementButton);
    setIsManagementButtonVisible(false);
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
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write a comment for the pin..."
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
                color: "red",
                border: "1.5px solid red",
              }}
            />
          </form>
        </div>

        <div className="getPin-comment">
          {isManagementButtonVisible && (
            <button onClick={handleManagementButtonClick}>
              Manage Comment
            </button>
          )}

          {isEditing && (
            <>
              <div>
                <textarea
                  placeholder="Edit your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
              <button onClick={() => toEditComment(commentId, commentText)}>
                Submit
              </button>
            </>
          )}

          {pin.comments
            ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((comment) => (
              <div key={comment.id}>
                <p>• &nbsp;&nbsp;{comment.comment}</p>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;By&nbsp;&nbsp;---
                  {comment.user.username}
                </p>
                <div className="getPin-edit-delete-buttons">
                  {managementButton && comment.user.id === currentUserId && (
                    <div>
                      <button onClick={() => handleEditButtonClick(comment)}>
                        Edit Comment
                      </button>
                      <button>
                        Delete Comment
                        {/* <OpenModalMenuItem
                          itemText='Delete'
                          modalComponent={<DeletePin />}
                        /> */}
                      </button>
                      <button onClick={backToPin}> Back </button>
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
