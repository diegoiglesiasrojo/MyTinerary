import React, {useState, useEffect} from "react"
import {Link, NavLink} from "react-router-dom"
import {FaPaperPlane, FaUserAlt} from "react-icons/fa"
import {GrMenu} from "react-icons/gr"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"

const Header = (props) => {
    const [displayNavMenu, setDisplayNavMenu] = useState(false)
    const [displayNavUser, setDisplayNavUser] = useState(false)
    const [displayMenuButtom, setDisplayMenuButtom] = useState(true)

    const togleDisplayMenu = () => {
        setDisplayMenuButtom(!displayMenuButtom)
        setDisplayNavMenu(!displayNavMenu)
    }

    const togleDisplayUser = () => {
        setDisplayMenuButtom(!displayMenuButtom)
        setDisplayNavUser(!displayNavUser)
    }

    useEffect(() => {
        if(localStorage.getItem("token") && props.userToken === null) {
            let user = {
                name: localStorage.getItem("name"),
                image: localStorage.getItem("image"),
                token: localStorage.getItem("token")
            }
            props.logInUser(user)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <header>
            <Link className="logoHeader" to="/">
                <p><span><FaPaperPlane/></span>MyTinerary</p>
                <p>in Europe</p>
            </Link>
            {props.userName && <p className="headerUserName">Welcome {props.userName}</p>}
            <div className="divContainerNav">
                <nav onMouseOut={togleDisplayMenu} style={{display: displayNavMenu ? "flex":"none"}}>
                    <NavLink exact to="/"><p>Home</p></NavLink>
                    <NavLink to="/cities"><p>Cities</p></NavLink>
                </nav>
                <nav onMouseOut={togleDisplayUser} style={{display: displayNavUser ? "flex":"none"}}>
                    {!props.userToken ? <Link to="/signUp"><p>Sign Up</p></Link> : <Link to="/settings"><p>Settings</p></Link>}
                    {!props.userToken ? <Link to="/logIn"><p>Log In</p></Link> : <p onClick={() => props.logOutUser()} className="logOutNav">LogOut</p>}
                </nav>
                <div onClick={togleDisplayMenu} style={{display: displayMenuButtom ? "flex":"none"}} className="headerMenuButtom"><GrMenu/></div>
                <div onClick={togleDisplayUser} style={{
                    display: displayMenuButtom ? "flex":"none", 
                    backgroundImage: `url('${props.userImage}')`, 
                    backgroundPosition: "center", 
                    backgroundSize: "cover"
                    }} className="headerUserIcon">
                        {!props.userImage && <FaUserAlt/>}
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        userName: state.users.name,
        userImage: state.users.image,
        userToken: state.users.token
    }
}

const mapDispatchToProps = {
    logInUser: usersAction.logInLocalStorage,
    logOutUser: usersAction.logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)