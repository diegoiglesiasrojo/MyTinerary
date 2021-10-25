import axios from "axios"

const usersAction = {
    signUp: (newUser) => {
        return async (dispatch) => {
            try {
                let response = await axios.post("http://192.168.0.103:4000/api/user/account", {...newUser})
                if (response.data.success) {
                    dispatch({type: "LOGIN_OR_SIGNUP", payload: response.data.response})
                    return{success: true}
                } else {
                    return{success: false, error: response.data.error}
                }
            } catch (e) {
                console.log(e)
                return{success: false, error: [{path: ["failAPI"], message: "Fail to connect with the API"}]}
            }
        }
    },
    logIn: (logInUser) => {
        return async (dispatch) => {
            try {
                let response = await axios.post("http://192.168.0.103:4000/api/user/logIn", {...logInUser})
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
    logOut: () => {
        return (dispatch) => {
            dispatch({ type: "LOG_OUT"})
        }
    },
    getCountries: () => {
        return async () => {
            try {
                let response = await axios.get(`http://api.countrylayer.com/v2/all?access_key=8dbd1d3ae6b291f1f4d4aaf7a6f93e61`)
                return{success: true, response: response}
            } catch (e) {
                return{success: false, error: e.message}
            }
        }
    },
    getUserComments: (comment) => {
        return async () => {
            try {
                let response = await axios.get(`http://192.168.0.103:4000/api/user/comments/${comment.userId}`)
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
    },
    // updateUser: (user, token, userId) => {
    //     return async () => {
    //         try {
    //             let response = await axios.put(
    //                 `http://192.168.0.103:4000/api/user/account/${userId}`, 
    //                 {user},
    //                 {headers: {
    //                     authorization: 'Bearer ' + token
    //                 }}
    //             )
    //             if (response.data.success) {
    //                 return{success: true}
    //             } else {
    //                 throw new Error("Fail to connect with the database")
    //             }
    //         } catch (e) {
    //             let err = e.message.includes("database") ? e.message : "Fail to connect with the API"
    //             return{success: false, error: [{path: ["failAPI"], message: err}]}
    //         }
    //     }
    // },
}
export default usersAction