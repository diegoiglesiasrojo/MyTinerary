import axios from "axios"

const activitiesAction = {
    readActivitiesByItineraryId: (id) => {
        return async () => {
            try {
                let response = await axios.get(`http://192.168.0.103:4000/api/activities/${id}`)
                if (response.data.success) {
                    return{success: true, response: response.data.response}
                } else {
                    throw new Error(response.data.error)
                }
            } catch (e) {
                let err = e.message.includes("database") || e.message.includes("activities") ? 
                    e.message :
                    "Fail to connect with the API"
                return{success: false, error: err}
            }
        }
    }
}
export default activitiesAction