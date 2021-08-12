import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"

const listCities = [
    {
        id: 0,
        cityName: "amsterdam",
        cityImage: "./assets/carrousel/amsterdam.jpg"
    },
    {
        id: 1,
        cityName: "barcelona",
        cityImage: "./assets/carrousel/barcelona.jpg"
    },
    {
        id: 2,
        cityName: "berlin",
        cityImage: "./assets/carrousel/berlin.jpg"
    },
    {
        id: 3,
        cityName: "london",
        cityImage: "./assets/carrousel/london.jpg"
    },
    {
        id: 4,
        cityName: "madrid",
        cityImage: "./assets/carrousel/madrid.jpg"
    },
    {
        id: 5,
        cityName: "malaga",
        cityImage: "./assets/carrousel/malaga.jpg"
    },
    {
        id: 6,
        cityName: "lisbon",
        cityImage: "./assets/carrousel/lisbon.jpg"
    },
    {
        id: 7,
        cityName: "brussels",
        cityImage: "./assets/carrousel/brussels.jpg"
    },
    {
        id: 8,
        cityName: "hamburg",
        cityImage: "./assets/carrousel/hamburg.jpg"
    },
    {
        id: 9,
        cityName: "paris",
        cityImage: "./assets/carrousel/paris.jpg"
    },
    {
        id: 10,
        cityName: "rome",
        cityImage: "./assets/carrousel/rome.jpg"
    },
    {
        id: 11,
        cityName: "venice",
        cityImage: "./assets/carrousel/venice.jpg"
    }
]

const Cities = () => {
    useEffect(() => {
        window.scroll(0,0)
    }, [])

    const [citySearched, setCitySearched] = useState('')

    const inputHandler = (e) => {
        setCitySearched(e.target.value.trim().toLowerCase())
    }
    
    const filteredCities = listCities.filter(city => {
        const arrayCityName = city.cityName.split("")
        const arrayCitySearched = citySearched.split("")
        let count = 0
        arrayCitySearched.forEach((character, index) => {
            if (character === arrayCityName[index]) {
                count = count + 1
            }
        })
        return(count === arrayCitySearched.length || citySearched === '')
    })

    const renderCities = filteredCities.map(city => {
        return (
            <Link to={`/city/${city.id}`} key={city.cityName}>
                <article className="citiesRenderCities" style={{backgroundImage : `url(${city.cityImage})`}} >
                    <p>{city.cityName}</p>
                </article>
            </Link>
        )
    })

    const noCitiesToRender = <article className="citiesNoCitiesToRender"><p>no cities to render</p></article>

    return (
        <main className="citiesMain">
            <section className="citiesIntroductionSection">
                <h2>What are you waiting for?</h2>
                <h2>Your next destination awaits you</h2>
                <fieldset>
                    <label htmlFor="cityInput">Search your dream's city:</label>
                    <input type="text" id="cityInput" name="cityInput" onChange={inputHandler}/>
                </fieldset>
            </section>
            <section className="citiesRenderedSection">
                {filteredCities.length === 0 ? noCitiesToRender : renderCities}
            </section>
        </main>
    )
}

export default Cities