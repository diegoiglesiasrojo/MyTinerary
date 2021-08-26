const usersReducer = (state = {token: null, name: null, image: null}, action) => {
    switch (action.type) {
        case "LOGIN_OR_SIGNUP":
            localStorage.setItem('name', action.payload.name)
            localStorage.setItem('image', action.payload.image)
            localStorage.setItem('token', action.payload.token)
            return {
               token: action.payload.token,
               name: action.payload.name,
               image: action.payload.image
            }
        case "LOG_OUT":
            localStorage.removeItem('name')
            localStorage.removeItem('image')
            localStorage.removeItem('token')
            return {
                name: null,
                image: null,
                token: null
            }   
        default:
            return state
    }
}
export default usersReducer