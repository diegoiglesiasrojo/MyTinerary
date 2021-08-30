import React, {useState} from "react"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"
import GoogleLogin from 'react-google-login'
import {Link} from "react-router-dom"

const LogIn = (props) => {
    const [user, setUser] = useState({
        mail: "",
        password: ""
    })
    const [errors, setErrors] = useState("")

    const inputHandle = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitUser = (e) => {
        e.preventDefault()
        if (Object.keys(user).some(property => user[property] === "")) {
            setErrors("You must be write all the data")
        } else {
            props.logInUser(user)
            .then(res => {
                !res.success && setErrors(res.error)
            })
            .catch(e => console.log(e))
        }
    }

    const responseGoogle = response => {
        let userToLogInWithGoogle = {
            mail: response.profileObj.email,
            password: response.profileObj.googleId,
            googleLogIn: true
        }
        props.logInUser(userToLogInWithGoogle)
        .catch(e => console.log(e))
    }

    const renderError = () => {
        return (
            <p style={{opacity: errors === "" ? "0": "1"}}>{errors === "" ? "Error": errors}</p>
        )
    }

    return(
        <main className="logInMain">
            <form className="logInForm" onSubmit={submitUser}>
                <div className="logInDiv">
                    {renderError()}
                    <input type="mail" placeholder="Mail" name="mail" onChange={inputHandle}/>
                    <input type="password" placeholder="Password" name="password" onChange={inputHandle}/>
                </div>
                <div className="logInDivButtoms">
                    <input type="submit" value="log In"/>
                    <input type="reset" value="reset"/>
                </div>
                <GoogleLogin
                    clientId="1099222794281-5lb2rka7f0lmf5ho4qkets68lmk6qtpn.apps.googleusercontent.com"
                    buttonText="Log In with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </form>
            <section className="logInCallToAction">
                <Link to="/signUp"><p>Don't have an account? Sign Up here</p></Link>
            </section>
        </main>
    )
}

const mapDispatchToProps = {
    logInUser: usersAction.logIn,
}

export default connect(null, mapDispatchToProps)(LogIn)