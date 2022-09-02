import {combineReducers} from "redux"
import theme from "./store/theme/reducer";
import network from "./store/network/reducer";

const rootReducer = combineReducers({
    theme,
    network
});
export default rootReducer;