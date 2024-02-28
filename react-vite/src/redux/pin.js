const GET_PIN = 'pins/GET_PIN';
const GET_PINS = 'pins/GET_PINS';
// const POST_PIN = 'pins/POST_PIN';
// const EDIT_PIN = 'pins/EDIT_PIN';
// const DELETE_PIN = 'pins/DELETE_PIN';


// Action Creators
const getPin = (pin) => ({
     type: GET_PIN,
     payload: pin
});

const getPins = (pins) => ({
     type: GET_PINS,
     payload: pins
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

          default:
               return state;
     }
}


export default pinReducer;
