const GET_PIN = 'pins/GET_PIN';
const GET_PINS = 'pins/GET_PINS';
// Post wait AWS
const POST_PIN = 'pins/POST_PIN';
const EDIT_PIN = 'pins/EDIT_PIN';
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

const postPin = (pin) => ({
     type: POST_PIN,
     payload: pin
})

const editPin = (pin) => ({
     type: EDIT_PIN,
     payload: pin
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
     // data.get("title", pin.title)
     console.log("pin_link FROM THE POST PIN THUNK==>", data.get('pin_link'))
     console.log("title FROM THE POST PIN THUNK==>", data.get('title'))
     console.log("description FROM THE POST PIN THUNK==>", data.get('description'))
     // console.log("data.pin FROM THE POST PIN THUNK===>", data.pin_link)
     console.log("pin FROM THE POST PIN THUNK===>", pin)

     const response = await fetch('/api/pin/pin-creation-tool/', {
          method: 'POST',
          body: data
     })
     console.log("RESPONSE FROM THUNK===>", response)

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
// export const thunkEditPin = (pin) => async (dispatch) => {
//      const pinId = pin.id;
//      const formData = new FormData();
//      for (let key of Object.keys())

// }



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

          default:
               return state;
     }
}


export default pinReducer;
