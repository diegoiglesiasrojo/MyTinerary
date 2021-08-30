import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"
import GoogleLogin from 'react-google-login'
import {Link} from "react-router-dom"

const SignUp = (props) => {
    const [user, setUser] = useState({
        name: "",
        surname: "",
        image: "",
        country: "",
        mail: "",
        password: ""
    })
    const [countries, setCountries] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        window.scroll(0,0)
        props.getAllTheCountries()
        .then(res => {
            setCountries(res.response.data)
        })
        .catch(e => console.log(e))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inputHandle = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitUser = (e) => {
        e.preventDefault()
        if (Object.keys(user).some(property => user[property] === "")) {
            setErrors([{path: ["failData"], message: "You must be write all the data"}])
        } else {
            props.signUpUser(user)
            .then(res => {
                !res.success && setErrors(res.error)
            })
            .catch(e => console.log(e))
        }
    }

    const responseGoogle = response => {
        let newUserWithGoogle = {
            name: response.profileObj.givenName,
            surname: response.profileObj.familyName,
            image: response.profileObj.imageUrl,
            country: "World",
            mail: response.profileObj.email,
            password: response.profileObj.googleId,
            google: true
        }
        props.signUpUser(newUserWithGoogle)
        .then(res => !res.success && setErrors(res.error))
        .catch(e => console.log(e))
    }

    const renderSelect = countries.map(country => {
        return(
            <option key={country.name} value={country.name}>{country.name}</option>
        )
    })

    const renderError = (inputName) => {
        let errorToRender = errors.find(error => error.path[0] === inputName)
        return(
            <p style={{opacity: errorToRender ? "1": "0"}}>{errorToRender ? errorToRender.message: "Error"}</p>
        )
    }

    return(
        <main className="signUpMain">
            <form className="signUpForm" onSubmit={submitUser}>
                <div className="signUpDiv">
                    <input type="text" placeholder="Name" name="name" onChange={inputHandle}/>
                    {renderError("name")}
                    <input type="text" placeholder="Surname" name="surname" onChange={inputHandle}/>
                    {renderError("surname")}
                    <input type="text" placeholder="Image url" name="image" onChange={inputHandle}/>
                    {renderError("image")}
                    <select name="country" onChange={inputHandle}>
                        <option value="#">Select your country</option>
                        {renderSelect}
                    </select>
                    {renderError("country")}
                    <input type="mail" placeholder="Mail" name="mail" onChange={inputHandle}/>
                    {renderError("mail")}
                    <input type="password" placeholder="Password" name="password" onChange={inputHandle}/>
                    {renderError("password")}
                </div>
                <div className="signUpDivButtoms">
                    <input type="submit" value="Register"/>
                    <input type="reset" value="Reset"/>
                </div>
                <GoogleLogin
                    clientId="1099222794281-5lb2rka7f0lmf5ho4qkets68lmk6qtpn.apps.googleusercontent.com"
                    buttonText="Sign Up with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                {renderError("failDataBase")}
                {renderError("failData")}
            </form>
            <section className="signUpCallToAction">
                <Link to="/logIn"><p>Did you have an account? Log In here</p></Link>
            </section>
        </main>
    )
}

const mapDispatchToProps = {
    signUpUser: usersAction.signUp,
    getAllTheCountries: usersAction.getCountries
}

export default connect(null, mapDispatchToProps)(SignUp)