const cityReducer = (state = {citySelected: {}}, action) => {
    switch (action.type) {
        case "GET_CITY":
            return {
                ...state,
                citySelected: action.payload
            }
        default:
            return state
    }
}
export default cityReducer