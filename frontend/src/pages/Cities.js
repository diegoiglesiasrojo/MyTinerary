import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

const Cities = () => {
    const [listCities, setListCities] = useState([])
    const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scroll(0,0)
        const getCities = async () => {
            try {
                await axios.get("http://localhost:4000/api/cities")
                .then(res => {
                    if (res.data.success) {
                        setListCities(res.data.response)
                    } else {
                        throw new Error ("Fail to connect with the database")
                    }
                })
            }
            catch (error){
                setConnectionWithAPI(
                    error.message.includes("database") ?
                    error.message :
                    "Fail to connect with the API"
                )
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }
        getCities()
    }, [])

    const [citySearched, setCitySearched] = useState('')
    const inputHandler = (e) => {
        setCitySearched(e.target.value.trim().toLowerCase())
    }
    
    const filteredCities = listCities.filter(city => {
        const arrayCityName = city.cityName.toLowerCase().split("")
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
            <Link to={`/city/${city._id}`} key={city._id}>
                <article className="citiesRenderCities" style={{backgroundImage : `url(${city.cityImage})`}} >
                    <p>{city.cityName}</p>
                </article>
            </Link>
        )
    })

    const noCities = (text) => {
        return(
            <article className="citiesNoCitiesToRender"><p>{text}</p></article>
        )
    }

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
                {loading ?
                    noCities("Loading...") :
                    (connectionWithAPI === "connected" ?
                        (filteredCities.length === 0 ?
                            noCities("No cities to render") :
                            renderCities
                        ) :
                        noCities(connectionWithAPI)
                    )
                }
            </section>
        </main>
    )
}
export default Cities