import {combineReducers} from "redux"
import citiesReducer from "./citiesReducer.js"
import cityReducer from "./cityReducer.js"

const rootReducer = combineReducers({
    cities: citiesReducer,
    city: cityReducer
})
export default rootReducer