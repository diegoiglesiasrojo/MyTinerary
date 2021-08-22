import axios from "axios"

const itinerariesAction = {
    readItineraries: (id) => {
        return async (dispatch) => {
            try {
                let response = await axios.get(`http://localhost:4000/api/itineraries/${id}`)
                if (response.data.success) {
                    dispatch({type: "GET_ITINERARIES", payload: response.data.response})
                    return{success: true, error: null}
                } else {
                    throw new Error("Fail to connect with the database")
                }
            } catch (e) {
                let err = e.message.includes("database") ? e.message : "Fail to connect with the API"
                return{success: false, error: err}
            }
        }
    }
}
export default itinerariesAction