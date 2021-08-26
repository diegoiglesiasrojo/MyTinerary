import React, {useState} from "react"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"

const SignUp = (props) => {
    const [user, setUser] = useState({})

    const inputHandle = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitUser = (e) => {
        e.preventDefault()
        props.signUpUser(user)
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }

    return(
        <main>
            <form onSubmit={submitUser}>
                <input type="text" id="name" name="name" onChange={inputHandle}/>
                <input type="text" id="surname" name="surname" onChange={inputHandle}/>
                <input type="text" id="image" name="image" onChange={inputHandle}/>
                <input type="text" id="country" name="country" onChange={inputHandle}/>
                <input type="mail" id="mail" name="mail" onChange={inputHandle}/>
                <input type="password" id="password" name="password" onChange={inputHandle}/>
                <input type="submit" value="register"/>
                <input type="reset" value="reset"/>
            </form>
        </main>
    )
}

const mapDispatchToProps = {
    signUpUser: usersAction.signUp,
}

export default connect(null, mapDispatchToProps)(SignUp)