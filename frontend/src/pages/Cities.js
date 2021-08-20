import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import citiesAction from "../redux/actions/citiesAction.js"

const Cities = (props) => {
    // const [listCities, setListCities] = useState(props.allTheCities)
    // const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scroll(0,0)
        const loadingCities = async () => {
            await props.getCities()
            setLoading(false)
        }
        loadingCities()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [citySearched, setCitySearched] = useState('')
    const inputHandler = (e) => {
        setCitySearched(e.target.value.trim().toLowerCase())
    }
    
    const filteredCities = props.allTheCities.filter(city => {
        return city.cityName.toLowerCase().startsWith(citySearched)
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
                {/* {loading ?
                noCities("Loading...") :
                connectionWithAPI === "connected" ?
                (filteredCities.length === 0 ?
                noCities("There are no cities to see") :
                renderCities
                ) :
                noCities(connectionWithAPI)
                } */}
                {loading ?
                noCities("Loading...") :
                filteredCities.length === 0 ?
                noCities("There are no cities to see") :
                renderCities
                }
            </section>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        allTheCities: state.cities.listCities
    }
}

const mapDispatchToProps = {
    getCities: citiesAction.readCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)