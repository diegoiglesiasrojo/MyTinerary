import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import citiesAction from "../redux/actions/citiesAction.js"

const Cities = (props) => {
    const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scroll(0,0)
        props.getCities()
        .then(res => {
            if (!res.success) {
                setConnectionWithAPI(res.error)
            }
            setLoading(false)
            props.getFilteredCities("")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inputHandler = (e) => {
        props.getFilteredCities(e.target.value)
    }
    
    const renderCities = props.listOfFilteredCities.map(city => {
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
                connectionWithAPI === "connected" ?
                (props.listOfFilteredCities.length === 0 ?
                noCities("There are no cities to see") :
                renderCities
                ) :
                noCities(connectionWithAPI)
                }
            </section>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        listOfFilteredCities: state.cities.listFilteredCities,
    }
}

const mapDispatchToProps = {
    getCities: citiesAction.readCities, 
    getFilteredCities: citiesAction.readFilteredCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)