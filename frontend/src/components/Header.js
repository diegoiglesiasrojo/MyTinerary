import React from "react"
import {Link, NavLink} from "react-router-dom"
import {FaPaperPlane, FaUserAlt} from "react-icons/fa"
import {GrMenu} from "react-icons/gr"
import {useState} from "react"

const Header = () => {
    const [displayState, setDisplayState] = useState(true)
    const togleDisplay = () => {
        displayState ? setDisplayState(false) : setDisplayState(true)
    }
    const displayMenuButtom = displayState ? "flex" : "none"
    const displayNav = displayState ? "none" : "flex"
    return (
        <header style={{backgroundImage : "url('/assets/banderas.jpg')"}}>
            <Link exact={true} to="/">
                <p><span><FaPaperPlane/></span>MyTinerary</p>
            </Link>
            <div className="divContainerNav">
                <nav onMouseOut={togleDisplay} style={{display: displayNav}}>
                    <NavLink exact={true} to="/"><p>Home</p></NavLink>
                    <NavLink to="/Cities"><p>Cities</p></NavLink>
                    <NavLink exact={true} to="/"><p>Sign In</p></NavLink>
                    <NavLink exact={true} to="/"><p>Sign Out</p></NavLink>
                </nav>
                <div onClick={togleDisplay} style={{display: displayMenuButtom}} className="headerMenuButtom"><GrMenu/></div>
                <div onClick={togleDisplay} style={{display: displayMenuButtom}} className="headerUserIcon"><FaUserAlt/></div>
            </div>
            <div className="colorGradient"></div>
        </header>
    )
}

export default Header