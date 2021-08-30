const citiesReducer = (state = {listCities: [], listFilteredCities: []}, action) => {
    switch (action.type) {
        case "GET_CITIES":
            return {
                ...state,
                listCities: action.payload
            }
        case "GET_FILTERED_CITIES":
            const filteredCities = state.listCities.filter(city => {
                return city.cityName.toLowerCase().startsWith(action.payload.trim().toLowerCase())
            })
            return {
                ...state,
                listFilteredCities: filteredCities
            }
        default:
            return state
    }
}
export default citiesReducer