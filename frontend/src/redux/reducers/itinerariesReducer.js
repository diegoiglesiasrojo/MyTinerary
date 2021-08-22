const itinerariesReducer = (state = {listItineraries: []}, action) => {
    switch (action.type) {
        case "GET_ITINERARIES":
            return {
                ...state,
                listItineraries: action.payload
            }
        default:
            return state
    }
}
export default itinerariesReducer