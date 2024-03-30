import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { thunkGetBoard } from "../../redux/board";

const GetOneBoard = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user);
  const board = useSelector((state) => state.boards[boardId]);
  const pins = board?.pins;
  console.log("pins===>", pins);

  useEffect(() => {
    dispatch(thunkGetBoard(boardId));
  }, []);

  return (
    <div className="board_page-containers">
      <h1 style={{ padding: "140px 0px 0px 40px" }}>{board?.title} Board</h1>

      <div className="allPins-container">
        {pins?.map((pin) => (
          <div key={pin.id} className="allPins-eachpin">
            <NavLink to={`/pin/${pin.id}`}>
              <img src={pin.pin_link} alt={pin.title} />
            </NavLink>
            <div className="pinTitle">{pin.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetOneBoard;
