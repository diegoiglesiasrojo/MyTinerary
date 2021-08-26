import React, {useState} from "react"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"

const LogIn = (props) => {
    const [user, setUser] = useState({})

    const inputHandle = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitUser = (e) => {
        e.preventDefault()
        props.logInUser(user)
        .then(res => {console.log(res)})
        .catch(e => console.log(e))
    }

    return(
        <main>
            <form onSubmit={submitUser}>
                <input type="mail" id="mail" name="mail" onChange={inputHandle}/>
                <input type="password" id="password" name="password" onChange={inputHandle}/>
                <input type="submit" value="logIn"/>
                <input type="reset" value="reset"/>
            </form>
        </main>
    )
}

const mapDispatchToProps = {
    logInUser: usersAction.logIn,
}

export default connect(null, mapDispatchToProps)(LogIn)