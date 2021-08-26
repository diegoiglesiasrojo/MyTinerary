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
                    throw new Error(response.data.error)
                }
            } catch (e) {
                // let err = e.message.includes("database") ? e.message : "Fail to connect with the API"
                return{success: false, error: e}
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
                return{success: false, error: e}
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
    }
    // ("Fail to connect with the database")
}
export default usersAction