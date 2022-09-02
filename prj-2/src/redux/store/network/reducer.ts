import actionTypes from "./actionTypes";
import initialState from './initialState';



const reducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actionTypes.CHANGE_NETWORK:
      console.log({ STATE: state, action });
      return action?.param
    default:
      return state;
  }
};

export default reducer;
