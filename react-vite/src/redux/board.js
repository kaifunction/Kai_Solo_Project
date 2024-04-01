import { createSelector } from 'reselect';
import { normalizeObj } from './helper';
import { thunkGetPins, thunkDeleteBoardPins } from './pin';


// Action Types
const GET_BOARD = 'boards/GET_BOARD';
const GET_BOARDS = 'boards/GET_BOARDS';
const ADD_BOARD = 'boards/ADD_BOARD';
const DELETE_BOARD = 'boards/DELETE_BOARD';
const EDIT_BOARD = 'boards/EDIT_BOARD';


// Custom Selectors
export const selectSingleBoard = (id) => createSelector(
     (state) => state.boards,
     (boards) => boards[id]
);

export const selectBoards = () => createSelector(
     (state) => state.boards,
     (boards) => Object.values(boards)
);


// Action Creators
export const getBoard = (board) => ({
     type: GET_BOARD,
     payload: board
});

export const getBoards = (boards) => ({
     type: GET_BOARDS,
     payload: boards
});

export const addBoard = (board) => ({
     type: ADD_BOARD,
     payload: board
});

const editBoard = (board) => ({
     type: EDIT_BOARD,
     payload: board
});

export const deleteBoard = (boardId) => ({
     type: DELETE_BOARD,
     payload: boardId
});


// Thunks
// Get a Board Thunk
export const thunkGetBoard = (boardId) => async (dispatch) => {
     if (!boardId) return;
     const res = await fetch(`/api/board/${boardId}/`);

     if (res.ok) {
          const { board } = await res.json();
          dispatch(getBoard(board));
          return board;
     }

     const data = await res.json();
     if(data.errors) return data;
}


// Get all Boards Thunk
export const thunkGetBoards = () => async (dispatch) => {
     const res = await fetch('/api/board/');

     // console.log("resFROMTHUNK===>", res)

     if (res.ok) {
          const { boards } = await res.json();
          dispatch(getBoards(boards));
          return boards;
     }

     const data = await res.json();
     if(data.errors) return data;
}


// Post a Board Thunk
export const thunkAddBoard = (board) => async (dispatch) => {
     const formData = new FormData();
     for (let key of Object.keys(board))
          formData.append(key, board[key]);

     const res = await fetch('/api/board/board-creation-tool/', {
          method: 'POST',
          body: formData
     });

     if (res.ok) {
          const { board } = await res.json();
          // dispatch(thunkDeleteBoardPins())
          dispatch(addBoard(board));
          return board;
     }

     const data = await res.json();
     if(data.errors) return data;
}



// Edit a Board Thunk
export const thunkUpdateBoard = (board) => async (dispatch) => {
     const { boardId, title, description, board_pic } = board;

     const formData = new FormData();
     formData.append('title', board['title']);
     formData.append('description', board['description']);
     formData.append('board_pic', board['board_pic']);


     const res = await fetch(`/api/board/${boardId}/edit/`, {
          method: 'POST',
          body: formData
     });

     console.log("res FROM THUNK===>", res)

     if (res.ok) {
          const edit_board = await res.json();
          dispatch(editBoard(board));
          return edit_board;
     }else {
          const data = await res.json();
          if(data.errors){
               return data
          }
     }

}


// Delete a Board Thunk
export const thunkDeleteBoard = (boardId) => async (dispatch) => {
     const res = await fetch(`/api/board/${boardId}/`, {
          method: 'DELETE'
     });

     if (res.ok) {
          const { board } = await res.json();
          dispatch(deleteBoard(boardId));
          dispatch(thunkGetPins())
          return board;
     }

     const data = await res.json();
     if(data.errors) return data;
}


// Reducer
const initialState = {};
const boardsReducer = (state = initialState, action) => {
     let newState;
     switch (action.type) {
          case GET_BOARD:
               newState = { ...state };
               newState[action.payload.id] = action.payload;
               return newState;

          case GET_BOARDS:
               newState = {...normalizeObj(action.payload)}
               return newState;

          case ADD_BOARD:
               newState = { ...state };
               newState[action.payload.id] = action.payload;
               return newState;

          case EDIT_BOARD:
               return {
                    ...state,
                    board: action.payload
               }

          case DELETE_BOARD:
               newState = { ...state };
               delete newState[action.payload];
               return newState;

          default:
               return state;
     }
}

export default boardsReducer;
