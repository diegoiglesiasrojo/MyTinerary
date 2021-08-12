import React, {useEffect} from "react"
import {Link} from "react-router-dom"

const listCities = [
    {
        id: 0,
        cityName: "Amsterdam",
        cityImage: "./assets/carrousel/amsterdam.jpg"
    },
    {
        id: 1,
        cityName: "Barcelona",
        cityImage: "./assets/carrousel/barcelona.jpg"
    },
    {
        id: 2,
        cityName: "Berlin",
        cityImage: "./assets/carrousel/berlin.jpg"
    },
    {
        id: 3,
        cityName: "London",
        cityImage: "./assets/carrousel/london.jpg"
    },
    {
        id: 4,
        cityName: "Madrid",
        cityImage: "./assets/carrousel/madrid.jpg"
    },
    {
        id: 5,
        cityName: "Malaga",
        cityImage: "./assets/carrousel/malaga.jpg"
    },
    {
        id: 6,
        cityName: "Lisbon",
        cityImage: "./assets/carrousel/lisbon.jpg"
    },
    {
        id: 7,
        cityName: "Brussels",
        cityImage: "./assets/carrousel/brussels.jpg"
    },
    {
        id: 8,
        cityName: "Hamburg",
        cityImage: "./assets/carrousel/hamburg.jpg"
    },
    {
        id: 9,
        cityName: "Paris",
        cityImage: "./assets/carrousel/paris.jpg"
    },
    {
        id: 10,
        cityName: "Rome",
        cityImage: "./assets/carrousel/rome.jpg"
    },
    {
        id: 11,
        cityName: "Venice",
        cityImage: "./assets/carrousel/venice.jpg"
    }
]

const Cities = () => {
    useEffect(() => {
        window.scroll(0,0)
    }, [])

    const renderCities = listCities.map(city => {
        return (
            <Link to={`/city/${city.id}`} key={city.cityName}>
                <article style={{backgroundImage : `url(${city.cityImage})`}} >
                    <p>{city.cityName}</p>
                </article>
            </Link>
        )
    })

    return (
        <main className="citiesMain">
            <section className="citiesIntroductionSection">
                <h2>What are you waiting for?</h2>
                <h2>Your next destination awaits you</h2>
                <fieldset>
                    <label htmlFor="cityInput">Search your dream's city:</label>
                    <input type="text" id="cityInput" name="cityInput"/>
                </fieldset>
            </section>
            <section className="citiesRenderedSection">
                {renderCities}
            </section>
        </main>
    )
}

export default Cities