import axios from "axios"

const citiesAction = {
    readCities: () => {
        return async (dispatch) => {
            try {
                let response = await axios.get("http://192.168.0.103:4000/api/cities")
                if (response.data.success) {
                    dispatch({type: "GET_CITIES", payload: response.data.response})
                    return{success: true, error: null}
                } else {
                    throw new Error("Fail to connect with the database")
                }
            } catch (e) {
                let err = e.message.includes("database") ? e.message : "Fail to connect with the API"
                return{success: false, error: err}
            }
        }
    },
    readFilteredCities: (citySearched) => {
        return (dispatch) => {
            dispatch({type: "GET_FILTERED_CITIES", payload: citySearched})
        }
    }
}
export default citiesAction