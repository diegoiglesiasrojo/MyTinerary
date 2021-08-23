import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import Itineraries from "../components/Itineraries.js"

const City = (props) => {
    useEffect(() => {
        window.scroll(0,0)
    }, [])
    
    let citySelected = props.listOfCities.filter(city => city._id === props.match.params.id)
    citySelected = citySelected[0]

    const renderCity = () => {
        return (
            <>
                <section className="cityIntroductionSection" style={{backgroundImage : `url(${citySelected.cityImage})`}} >
                    <h1>{citySelected.cityName}</h1>
                </section>
                <Itineraries cityId={props.match.params.id}/>
            </>
        )
    }

    if(props.listOfCities.length === 0){
        props.history.push("/cities")
        return false
    }

    return (
        <main className="cityMain">
            {renderCity()}
            <section className="cityReturnSection">
                <Link to="/cities"><p>Come back to discover a City</p></Link>
            </section>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        listOfCities: state.cities.listCities
    }
}

export default connect(mapStateToProps)(City)