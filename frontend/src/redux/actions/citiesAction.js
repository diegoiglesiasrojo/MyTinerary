import axios from "axios"

const citiesAction = {
    readCities: () => {
        return async (dispatch) => {
            await axios.get("http://localhost:4000/api/cities")
            .then(res => dispatch({type: "GET_CITIES", payload: res.data.response}))
        }
    }
}
export default citiesAction