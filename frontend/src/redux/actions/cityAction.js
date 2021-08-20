import axios from "axios"

const cityAction = {
    readCity: (id) => {
        return async (dispatch) => {
            await axios.get(`http://localhost:4000/api/cities/${id}`)
            .then(res => dispatch({type: "GET_CITY", payload: res.data.response}))
        }
    }
}
export default cityAction