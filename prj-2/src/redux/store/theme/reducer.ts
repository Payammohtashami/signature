import initialState from "./initialState";
import actionTypes from "./actionTypes";

const reducer = (state = initialState, actoin:{ type: string }) => {
    switch (actoin.type) {
        case actionTypes.CHANGE_THEME:
            return {...state,darkMode: !state.darkMode}
        default:
            return state
    }
}

export default reducer