import axios from "axios"

const itinerariesAction = {
    readItineraries: (id) => {
        return async (dispatch) => {
            try {
                let response = await axios.get(`http://192.168.0.103:4000/api/itineraries/${id}`)
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
    },
    createComment: (newCommentObject, itineraryId, token) => {
        return async () => {
            try {
                let response = await axios.put(
                    `http://192.168.0.103:4000/api/itineraries/pushComments/${itineraryId}`,
                    {...newCommentObject},
                    {headers: {
                        authorization: 'Bearer ' + token
                    }}
                )
                if (response.data.success) {
                    return{success: true}
                } else {
                    throw new Error("Fail to connect with the database")
                }
            } catch (e) {
                let err = e.message.includes("database") ? e.message : "Fail to connect with the API"
                return{success: false, error: err}
            }
        }
    },
    deleteComment: (commentId, itineraryId, token) => {
        return async () => {
            try {
                let response = await axios.put(
                    `http://192.168.0.103:4000/api/itineraries/pullComments/${itineraryId}`, 
                    {commentId},
                    {headers: {
                        authorization: 'Bearer ' + token
                    }}
                )
                if (response.data.success) {
                    return{success: true}
                } else {
                    throw new Error("Fail to connect with the database")
                }
            } catch (e) {
                let err = e.message.includes("database") ? e.message : "Fail to connect with the API"
                return{success: false, error: err}
            }
        }
    },
    updateComment: (commentId, comment, token) => {
        return async () => {
            try {
                let response = await axios.put(
                    `http://192.168.0.103:4000/api/itineraries/setComments/${commentId}`, 
                    {comment},
                    {headers: {
                        authorization: 'Bearer ' + token
                    }}
                )
                if (response.data.success) {
                    return{success: true}
                } else {
                    throw new Error("Fail to connect with the database")
                }
            } catch (e) {
                let err = e.message.includes("database") ? e.message : "Fail to connect with the API"
                return{success: false, error: err}
            }
        }
    },
    changeLike: (itineraryId, token, likeBoolean, userId) => {
        return async () => {
            try {
                let url = likeBoolean ? "pullLikes" : "pushLikes"
                let response = await axios.put(
                    `http://192.168.0.103:4000/api/itineraries/${url}/${itineraryId}`, 
                    {userId},
                    {headers: {
                        authorization: 'Bearer ' + token
                    }}
                )
                if (response.data.success) {
                    return{success: true}
                } else {
                    throw new Error("Fail to connect with the database")
                }
            } catch (e) {
                let err = e.message.includes("database") ? e.message : "Fail to connect with the API"
                return{success: false, error: err}
            }
        }
    },
}
export default itinerariesAction