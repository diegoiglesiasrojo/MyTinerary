import React from "react"
import {FaPaperPlane, FaTwitterSquare, FaInstagramSquare, FaYoutube} from "react-icons/fa"
import {Link} from "react-router-dom"
import {ImFacebook2} from "react-icons/im"

const Footer = () => {
    return (
        <footer>
            <div>
                <Link to="/" className="logoFooter">
                    <p><span><FaPaperPlane/></span>MyTinerary</p>
                    <p>in Europe</p>
                </Link>
                <nav className="navFooter">
                    <Link to="/"><p>Home</p></Link>
                    <Link to="/cities"><p>Cities</p></Link>
                </nav>
            </div>
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