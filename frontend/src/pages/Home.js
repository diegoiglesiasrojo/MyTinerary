import React, { useEffect } from "react"
import {Link} from "react-router-dom"
import Carrousel from "../components/Carrousel.js"
import {ImArrowDown} from "react-icons/im"

const Home = () => {
    useEffect(() => {
        window.scroll(0,0)
    })

    return (
        <main>
            <section className="welcomeSection" style={{backgroundImage : "url('./assets/berlinBackground.jpg')"}}>
                <article className="titleArticle">
                    <h2>Find your perfect trip, designed by insiders who know and love their cities!</h2>
                </article>
                <article className="callToActionArticle">
                    <div className="arrowDiv">
                        <ImArrowDown/>
                    </div>
                    <div className="callToActionDiv">
                        <Link to="/cities"><p>Go to discover a City</p></Link>
                    </div>
                </article>
            </section>
            <section className="carrouselSection">
                <article className="titleArticleCarrousel">
                    <h2>Popular European MyTineraries</h2>
                </article>
                <Carrousel/>
            </section>
        </main>
    )
}

export default Home