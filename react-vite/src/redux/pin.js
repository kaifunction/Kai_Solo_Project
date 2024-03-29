const GET_PIN = 'pins/GET_PIN';
const GET_PINS = 'pins/GET_PINS';
// Post wait AWS
const POST_PIN = 'pins/POST_PIN';
const EDIT_PIN = 'pins/EDIT_PIN';
const DELETE_PIN = 'pins/DELETE_PIN';

const POST_COMMENT = 'pins/POST_COMMENT';
const EDIT_COMMENT = 'pins/EDIT_COMMENT';
const DELETE_COMMENT = 'pins/DELETE_COMMENT';


// Action Creators
const getPin = (pin) => ({
     type: GET_PIN,
     payload: pin
});

const getPins = (pins) => ({
     type: GET_PINS,
     payload: pins
})

const postPin = (pin) => ({
     type: POST_PIN,
     payload: pin
})

const editPin = (pin) => ({
     type: EDIT_PIN,
     payload: pin
})

const deletePin = (pin) => ({
     type: DELETE_PIN,
     payload: pin
})


const postComment = (comment) => ({
     type: POST_COMMENT,
     payload: comment
})

export const editComment = (comment) => ({
     type: EDIT_COMMENT,
     payload: comment
})

const deleteComment = (commentId) => ({
     type: DELETE_COMMENT,
     payload: commentId
})


// Thunks
// Get One Pin
export const thunkGetPin = (pinId) => async (dispatch) => {
     const response = await fetch(`/api/pin/${pinId}`);

     if(response.ok){
          const pin = await response.json();
          dispatch(getPin(pin));
          return pin
     }
     const data = await response.json();
     if (data.errors) return data;
}

// Get All Pins
export const thunkGetPins = () => async (dispatch) => {
     const response = await fetch('/api/pin/');

     if(response.ok){
          const pins = await response.json();
          dispatch(getPins(pins));
          return pins
     }
     const data = await response.json();
     if (data.errors) return data;
}

// Post A Pin
export const thunkPostPin = (pin) => async (dispatch) => {
     const data = new FormData();
     data.append('pin_link', pin['pin_link'])
     data.append('title', pin['title'])
     data.append('description', pin['description'])

     const response = await fetch('/api/pin/pin-creation-tool/', {
          method: 'POST',
          body: data
     })
     // console.log("RESPONSE FROM THUNK===>", response)

     if (response.ok) {
          const new_pin = await response.json();
          dispatch(postPin(new_pin));
          return new_pin;
     } else {
          const data = await response.json();
          if (data.errors){
               return data
          }
     }
}

// Edit a pin
export const thunkEditPin = (pin) => async (dispatch) => {
     const { pinId, title, description, pin_link } = pin
     // console.log("PINID FROM THUNK", pinId)
     const formData = new FormData();
     formData.append('pin_link', pin['pin_link'])
     formData.append('title', pin['title'])
     formData.append('description', pin['description'])

     const response = await fetch (`/api/pin/${pinId}/edit/`, {
          method: 'POST',
          body: formData
     })
     console.log("response FROM EDIT THUNK", response)

     if (response.ok){
          const edit_pin = await response.json()
          dispatch(editPin(edit_pin))
          return edit_pin
     } else {
          const data = await response.json();
          if(data.errors){
               return data
          }
     }

}

// Delete a pin
export const thunkDeletePin = (pinId) => async (dispatch) => {
     const response = await fetch(`/api/pin/${pinId}`, {
          method: 'DELETE',
     })

     if (response.ok) {
          const delete_pin = await response.json()
          dispatch(deletePin(delete_pin))
          return delete_pin;
     } else {
          const data = await response.json();
          if(data.errors){
               return data
          }
     }
}

// Post a Comment
export const thunkPostComment = (pinId, comment) => async (dispatch) => {
     console.log('COMMENT FROM THUNK====>', comment)
     const response = await fetch(`/api/pin/${pinId}/comments/`, {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(comment)
     })
     // console.log("RESPONSE FROM THUNK ====>", response)

     if (response.ok) {
          const post_comment = await response.json()
          console.log('POST COMMENT FROM THUNK===>', post_comment)
          dispatch(postComment(post_comment))
          return post_comment
     } else {
          const data = await response.json();
          if(data.errors){
               return data
          }
     }
}


// Edit a Comment
export const thunkEditComment = (pinId, comment) => async (dispatch) => {
     // console.log('PINID, COMMENT FROM THUNK===>', pinId, comment)
     const response = await fetch(`/api/pin/${pinId}/comments/${comment.id}/`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(comment)
     })
     // console.log('RESPONSE FROM THUNK====>', response)

     if(response.ok) {
          const edit_comment = await response.json()
          dispatch(editComment(edit_comment))
          console.log("EDIT_COMMENT FROM THUNK====>", edit_comment)
          return edit_comment
     } else {
          const data = await response.json();
          if(data.errors){
               return data
          }
     }
}

// Delete a comment
export const thunkDeleteComment = (pinId, commentId) => async (dispatch) => {
     console.log('PINID, COMMENTId FROM THUNK===>', pinId, commentId)
     const response = await fetch(`/api/pin/${pinId}/comments/${commentId}/`, {
          method: 'DELETE'
     })
     console.log('RESPONSE FROM DELETE THUNK====>', response)

     if (response.ok){
          const delete_comment = await response.json()
          dispatch(deleteComment(delete_comment))
          console.log("DELETE_COMMENT FROM THUNK====>", delete_comment)
          // return delete_comment;
     } else {
          const data = await response.json();
          if(data.errors){
               return data
          }
     }
}


const initialState = { pins: {} }

const pinReducer = (state=initialState, action) => {
     let newState;
     switch(action.type) {

          case GET_PIN:
               newState = { ...state }
               newState.pins[action.payload.id] = action.payload;
               return newState;

          case GET_PINS:
               newState = { ...state }
               newState.pins = action.payload;
               return newState;

          case POST_PIN:
               newState = { ...state }
               newState.pins = { ...state.pins, [action.payload.id]: action.payload };
               return newState;

          case EDIT_PIN:
               return {
                    ...state,
                    pin: action.payload
               };

          case DELETE_PIN:
               newState = { ...state }
               newState.pins = { ...state.pins };
               delete newState.pins[action.pinId];
               return newState;

          case POST_COMMENT:
               newState = { ...state }
               newState.pins = { ...state.pins, [action.payload.id]: action.payload };
               return newState;

          case EDIT_COMMENT:
               newState = { ...state, pins: { ...state.pins } }; // 创建新对象以确保不直接修改原始 state
               const editedComment = action.payload;

               // 找到被编辑的评论并更新
               newState.pins[editedComment.pin_id].comments = newState.pins[editedComment.pin_id].comments.map(comment =>
               comment.id === editedComment.id ? { ...comment, comment: editedComment.comment } : comment);
               return newState;

          case DELETE_COMMENT:
               newState = { ...state };
               delete newState.pins[action.payload];
               return newState

          default:
               return state;
     }
}


export default pinReducer;
