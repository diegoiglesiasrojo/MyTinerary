import React from "react"
import {Link, NavLink} from "react-router-dom"
import {FaPaperPlane} from "react-icons/fa"
import {GrMenu} from "react-icons/gr"
import {useState} from "react"

const Header = () => {
    const [menuButtom, setMenuButtom] = useState(true)
    const renderNav = () => {
        menuButtom ? setMenuButtom(false) : setMenuButtom(true)
    }
    const renderButtom = () => {
        menuButtom ? setMenuButtom(false) : setMenuButtom(true)
    }
    const displayMenuButtom = menuButtom ? "flex" : "none"
    const displayNav = menuButtom ? "none" : "flex"
    return (
        <header style={{backgroundImage : "url('/assets/banderas.jpg')"}}>
            <Link exact to="/">
                <p><span><FaPaperPlane/></span>MyTinerary</p>
            </Link>
            <nav onMouseOut={renderButtom} style={{display: displayNav}}>
                <NavLink exact to="/"><p>Home</p></NavLink>
                <NavLink to="/Cities"><p>Cities</p></NavLink>
            </nav>
            <div onClick={renderNav} style={{display: displayMenuButtom}} className="headerMenuButtom"><GrMenu/></div>
            <div className="colorGradient"></div>
        </header>
    )
}

export default Header