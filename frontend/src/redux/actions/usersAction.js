import axios from "axios"

const usersAction = {
    signUp: (newUser) => {
        return async (dispatch) => {
            try {
                let response = await axios.post("http://localhost:4000/api/user/account", {...newUser})
                if (response.data.success) {
                    dispatch({type: "LOGIN_OR_SIGNUP", payload: response.data.response})
                    return{success: true}
                } else {
                    return{success: false, error: response.data.error}
                }
            } catch (e) {
                return{success: false, error: [{path: ["failAPI"], message: "Fail to connect with the API"}]}
            }
        }
    },
    logIn: (logInUser) => {
        return async (dispatch) => {
            try {
                let response = await axios.post("http://localhost:4000/api/user/logIn", {...logInUser})
                if (response.data.success) {
                    dispatch({type: "LOGIN_OR_SIGNUP", payload: response.data.response})
                    return{success: true}
                } else {
                    throw new Error(response.data.error)
                }
            } catch (e) {
                return{success: false, error: e.message}
            }
        }
    },
    logInLocalStorage: (user) => {
        return (dispatch) => {
           dispatch({ type: "LOGIN_OR_SIGNUP", payload: user})
        }
    },
    logOut: () => {
        return (dispatch) => {
            dispatch({ type: "LOG_OUT"})
        }
    },
    getCountries: () => {
        return async () => {
            try {
                let response = await axios.get("https://restcountries.eu/rest/v2/all")
                return{success: true, response: response}
            } catch (e) {
                return{success: false, error: e.message}
            }
        }
    },
    getUserComments: (comment) => {
        return async () => {
            try {
                let response = await axios.get(`http://localhost:4000/api/user/comments/${comment.userId}`)
                if (response.data.success) {
                    let res = {...response.data.response, 
                        userId: comment.userId,
                        comment: comment.comment,
                        commentId: comment.commentId
                    }
                    return{success: true, response: res}
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
export default usersAction