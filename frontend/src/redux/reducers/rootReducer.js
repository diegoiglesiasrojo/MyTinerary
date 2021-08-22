import {combineReducers} from "redux"
import citiesReducer from "./citiesReducer.js"
import itinerariesReducer from "./itinerariesReducer.js"

const rootReducer = combineReducers({
    cities: citiesReducer,
    itineraries: itinerariesReducer
})
export default rootReducer