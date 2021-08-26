import {combineReducers} from "redux"
import citiesReducer from "./citiesReducer.js"
import itinerariesReducer from "./itinerariesReducer.js"
import usersReducer from "./usersReducer.js"

const rootReducer = combineReducers({
    cities: citiesReducer,
    itineraries: itinerariesReducer,
    users: usersReducer
})
export default rootReducer