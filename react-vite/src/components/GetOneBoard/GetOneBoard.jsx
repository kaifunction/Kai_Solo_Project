import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { thunkGetBoard } from "../../redux/board";
import CreatePin from "../CreatePin/CreatePin";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteBoard from "../DeleteBoard/DeleteBoard";
import { FaChevronLeft } from "react-icons/fa";
import "./GetOneBoard.css";

const GetOneBoard = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCreatePin, setShowCreatePin] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  const board = useSelector((state) => state.boards[boardId]);
  const pins = board?.pins;
  console.log('board===>', board);
  console.log("pins===>", pins);

  useEffect(() => {
    dispatch(thunkGetBoard(boardId));
  }, []);

  const handleOpenCreatePin = () => {
    setShowCreatePin(true);
  };

  function toEditPage(e) {
     e.preventDefault();
     navigate(`/boards/${boardId}/edit`);
   }

   function backToBoards(e) {
     e.preventDefault();
     navigate(`/boards`);
   }

  return (
    <div className="board_page-containers">

      <h1 style={{ padding: "140px 0px 0px 80px" }}>{board?.title} Board</h1>
      <div className="board_page-text" style={{ padding: "0px 0px 0px 80px" }}>
            <h4>Description: {board?.description}</h4>
     </div>
      <button onClick={backToBoards} className="editBoard-button" style={{margin:'0 20px 0 80px'}}>
               <FaChevronLeft />
     </button>
     {currentUser?.id === board?.user.id && (
        <div>
      <button
        onClick={handleOpenCreatePin}
        className="createPin-button"
        style={{ margin: "0 20px 0 80px" }}
      >
        {" "}
        Create Pin{" "}
      </button>
      {showCreatePin && <CreatePin />}
     <button onClick={toEditPage}  className="getPin-edit-delete-button" style={{border:'2px soild #ff2f00', borderRadius:'15px', padding:'6px 10px'}}>Edit</button>

     <button  className="getPin-edit-delete-button" style={{width:'10px', height:'40px', backgroundColor:'white', border:'none'}}>
              <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<DeleteBoard />}
              />
            </button>

        </div>
      )}


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
