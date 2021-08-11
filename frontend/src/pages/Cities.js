import React from "react"

const listCities = [
    {
        cityName: "Amsterdam",
        cityImage: "./assets/carrousel/amsterdam.jpg"
    },
    {
        cityName: "Barcelona",
        cityImage: "./assets/carrousel/barcelona.jpg"
    },
    {
        cityName: "Berlin",
        cityImage: "./assets/carrousel/berlin.jpg"
    },
    {
        cityName: "London",
        cityImage: "./assets/carrousel/london.jpg"
    },
    {
        cityName: "Madrid",
        cityImage: "./assets/carrousel/madrid.jpg"
    },
    {
        cityName: "Malaga",
        cityImage: "./assets/carrousel/malaga.jpg"
    },
    {
        cityName: "Lisbon",
        cityImage: "./assets/carrousel/lisbon.jpg"
    },
    {
        cityName: "Brussels",
        cityImage: "./assets/carrousel/brussels.jpg"
    },
    {
        cityName: "Hamburg",
        cityImage: "./assets/carrousel/hamburg.jpg"
    },
    {
        cityName: "Paris",
        cityImage: "./assets/carrousel/paris.jpg"
    },
    {
        cityName: "Rome",
        cityImage: "./assets/carrousel/rome.jpg"
    },
    {
        cityName: "Venice",
        cityImage: "./assets/carrousel/venice.jpg"
    }
]

const Cities = () => {
    const renderCities = listCities.map(city => {
        return (
            <article key={city.cityName} style={{backgroundImage : `url(${city.cityImage})`}}>
                <p>{city.cityName}</p>
            </article>
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