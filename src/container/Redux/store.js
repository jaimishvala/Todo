import { applyMiddleware, createStore } from "redux"
import { rootReducer } from "."
import { thunk } from "redux-thunk";


export const configureStore = () => {
    let store = createStore(rootReducer, applyMiddleware(thunk))

    return store;
}   