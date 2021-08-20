const citiesReducer = (state = {listCities: []}, action) => {
    switch (action.type) {
        case "GET_CITIES":
            return {
                ...state,
                listCities: action.payload
            }
        default:
            return state
    }
}
export default citiesReducer