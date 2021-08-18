import React from "react"
import {Link, NavLink} from "react-router-dom"
import {FaPaperPlane, FaUserAlt} from "react-icons/fa"
import {GrMenu} from "react-icons/gr"
import {useState} from "react"

const Header = () => {
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

    return (
        <header>
            <Link to="/">
                <p><span><FaPaperPlane/></span>MyTinerary</p>
                <p>in Europe</p>
            </Link>
            <div className="divContainerNav">
                <nav onMouseOut={togleDisplayMenu} style={{display: displayNavMenu ? "flex":"none"}}>
                    <NavLink exact to="/"><p>Home</p></NavLink>
                    <NavLink to="/cities"><p>Cities</p></NavLink>
                </nav>
                <nav onMouseOut={togleDisplayUser} style={{display: displayNavUser ? "flex":"none"}}>
                    <Link to="/"><p>Log In</p></Link>
                    <Link to="/"><p>Sign Up</p></Link>
                </nav>
                <div onClick={togleDisplayMenu} style={{display: displayMenuButtom ? "flex":"none"}} className="headerMenuButtom"><GrMenu/></div>
                <div onClick={togleDisplayUser} style={{display: displayMenuButtom ? "flex":"none"}} className="headerUserIcon"><FaUserAlt/></div>
            </div>
        </header>
    )
}

export default Header