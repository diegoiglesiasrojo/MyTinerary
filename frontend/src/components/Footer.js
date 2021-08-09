import React from "react"
import {FaPaperPlane, FaTwitterSquare, FaInstagramSquare, FaYoutube} from "react-icons/fa"
import {Link} from "react-router-dom"
import {ImFacebook2} from "react-icons/im"

const Footer = () => {
    return (
        <footer>
            <Link exact={true} to="/" className="titleFooter">
                <p><span><FaPaperPlane/></span>MyTinerary®.</p>
                <p>All right reserverd</p>
            </Link>
            <nav>
                <Link exact={true} to="/"><p>Home</p></Link>
                <Link to="/Cities"><p>Cities</p></Link>
                <Link exact={true} to="/"><p>Sign In</p></Link>
                <Link exact={true} to="/"><p>Sign Out</p></Link>
            </nav>
            <nav className="socialMediaFooter">
                <a href="https://www.facebook.com/" target="_blank" className="facebookFooter" rel="noreferrer"><ImFacebook2/></a>
                <a href="https://twitter.com/" target="_blank" className="twitterFooter" rel="noreferrer"><FaTwitterSquare/></a>
                <a href="https://www.instagram.com/" target="_blank" className="instagramFooter" rel="noreferrer"><FaInstagramSquare/></a>
                <a href="https://www.youtube.com/" target="_blank" className="youtubeFooter" rel="noreferrer"><FaYoutube/></a>
            </nav>
        </footer>
    )
}

export default Footer