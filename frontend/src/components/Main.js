import React from "react"
import {Link} from "react-router-dom"
import Carrousel from "./Carrousel.js"

const Main = () => {
    return (
        <main>
            <section className="welcomeSection" style={{backgroundImage : "url('/assets/berlinBackground.jpg')"}}>
                <article className="titleArticle">
                    <h2>Find your perfect trip, designed by insiders who know and love their cities!</h2>
                </article>
                <article className="callToActionArticle">
                    <Link to="/Cities"><p>Go to discover a City</p></Link>
                </article>
            </section>
            <section className="carrouselSection">
                <article className="titleArticleCarrousel">
                    <h2>Popular MYtineraries</h2>
                </article>
                <Carrousel/>
            </section>
        </main>
    )
}

export default Main