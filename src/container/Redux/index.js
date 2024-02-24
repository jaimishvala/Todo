import { combineReducers } from "redux";
import fetchData from "./fetch.slice";


export const rootReducer = combineReducers({
    fetch: fetchData
})