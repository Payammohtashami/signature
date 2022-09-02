import {applyMiddleware, createStore} from "redux";
import rootReducer from "./rootReducer";
import {createWrapper} from "next-redux-wrapper";


const bindMiddelWare = (middelware:any) => {
    if(process.env.NODE_ENV !== "production") {
        const {composeWithDevTools} = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middelware));
    }
    return applyMiddleware(...middelware)
}

const initStore = () => {
    return createStore(rootReducer, bindMiddelWare([]))
}

export const wrapper = createWrapper(initStore)