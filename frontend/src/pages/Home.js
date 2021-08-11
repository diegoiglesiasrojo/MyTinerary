import React, { useEffect } from "react"
import {Link} from "react-router-dom"
import Carrousel from "../components/Carrousel.js"

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
                    <Link to="/cities"><p>Go to discover a City</p></Link>
                </article>
            </section>
            <section className="carrouselSection">
                <article className="titleArticleCarrousel">
                    <h2>Popular european MYtineraries</h2>
                </article>
                <Carrousel/>
            </section>
        </main>
    )
}

export default Home