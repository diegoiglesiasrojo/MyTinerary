import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

const Cities = () => {
    const [listCities, setListCities] = useState([])

    useEffect(() => {
        window.scroll(0,0)
        axios.get("http://localhost:4000/api/cities").then(res => setListCities(res.data.response))
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
            <Link to={`/city/${city._id}`} key={city.cityName}>
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