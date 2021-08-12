import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import {FaTools} from "react-icons/fa"

const listCities = [
    {
        id: 0,
        cityName: "Amsterdam",
        cityImage: "/assets/carrousel/amsterdam.jpg"
    },
    {
        id: 1,
        cityName: "Barcelona",
        cityImage: "/assets/carrousel/barcelona.jpg"
    },
    {
        id: 2,
        cityName: "Berlin",
        cityImage: "/assets/carrousel/berlin.jpg"
    },
    {
        id: 3,
        cityName: "London",
        cityImage: "/assets/carrousel/london.jpg"
    },
    {
        id: 4,
        cityName: "Madrid",
        cityImage: "/assets/carrousel/madrid.jpg"
    },
    {
        id: 5,
        cityName: "Malaga",
        cityImage: "/assets/carrousel/malaga.jpg"
    },
    {
        id: 6,
        cityName: "Lisbon",
        cityImage: "/assets/carrousel/lisbon.jpg"
    },
    {
        id: 7,
        cityName: "Brussels",
        cityImage: "/assets/carrousel/brussels.jpg"
    },
    {
        id: 8,
        cityName: "Hamburg",
        cityImage: "/assets/carrousel/hamburg.jpg"
    },
    {
        id: 9,
        cityName: "Paris",
        cityImage: "/assets/carrousel/paris.jpg"
    },
    {
        id: 10,
        cityName: "Rome",
        cityImage: "/assets/carrousel/rome.jpg"
    },
    {
        id: 11,
        cityName: "Venice",
        cityImage: "/assets/carrousel/venice.jpg"
    }
]

const City = (props) => {
    useEffect(() => {
        window.scroll(0,0)
    }, [])

    const citySelected = listCities.find(city => parseInt(props.match.params.id) === city.id)
    return (
        <main className="cityMain">
            <section className="cityIntroductionSection" style={{backgroundImage : `url(${citySelected.cityImage})`}} >
                <h1>{citySelected.cityName}</h1>
            </section>
            <section className="cityItinerarySection">
                <p><span><FaTools/></span>Under construction<span><FaTools/></span></p>
            </section>
            <section className="cityReturnSection">
                <Link to="/cities"><p>Come back to discover a City</p></Link>
            </section>
        </main>
    )
}

export default City