import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import Itinerary from "../components/Itinerary.js"
import {connect} from "react-redux"
import cityAction from "../redux/actions/cityAction.js"

const City = (props) => {
    // const [citySelected, setCitySelected] = useState({})
    // const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)
    const [AllItineraries, setAllItineraries] = useState([])
    const [connectionWithAPIItineraries, setConnectionWithAPIItineraries] = useState("connected")
    const [loadingItineraries, setLoadingItineraries] = useState(true)

    useEffect(() => {
        window.scroll(0,0)
        const loadingCity = async () => {
            await props.getCity(props.match.params.id)
            setLoading(false)
        }
        loadingCity()

        const getAllItineraries = async () => {
            try {
                await axios.get(`http://localhost:4000/api/itineraries`)
                .then(res => {
                    if (res.data.success) {
                        setAllItineraries(res.data.response)
                    } else {
                        throw new Error ("Fail to connect with the database")
                    }
                })
            } catch (error) {
                setConnectionWithAPIItineraries(
                    error.message.includes("database") ?
                    error.message :
                    "Fail to connect with the API"
                )
                console.error(error)
            } finally {
                setLoadingItineraries(false)
            }
        }
        getAllItineraries()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderH = (text, H) => {
        return(
            <H>{text}</H>
        )
    }

    const renderSection = (text) => {
        return (
            <section className="cityItinerarySection">
                {renderH(text, "h2")}
            </section>
        )
    }

    const renderCity = () => {
        return (
            <section className="cityIntroductionSection" style={{backgroundImage : `url(${props.cityObject.cityImage})`}} >
                <h1>{props.cityObject.cityName}</h1>
            </section>
        )
    }

    const renderItineraries = AllItineraries.map(itinerary => {
        return (
            <section className="cityItinerarySection" key={itinerary._id}>
                <Itinerary itinerary={itinerary}/>
            </section>
        )
    })
    // <section className="cityIntroductionSection" style={{backgroundImage : `url(${props.citySelected.cityImage})`}} >
console.log(props)
    return (
        <main className="cityMain">
            {/* {loading ?
            renderH("Loading...", "h1") :
            connectionWithAPI === "connected" ?
            renderCity() :
            renderH(connectionWithAPI, "h1")
            } */}
            {loading ?
            <section className="cityIntroductionSection"><h1>Loading...</h1></section> :
            renderCity()
            }
            {loadingItineraries ?
            renderSection("Loading...") :
            connectionWithAPIItineraries === "connected" ?
            (AllItineraries.length === 0 ?
            renderSection("There are not itineraries to see") :
            renderItineraries
            ) :
            renderSection(connectionWithAPIItineraries)
            }
            <section className="cityReturnSection">
                <Link to="/cities"><p>Come back to discover a City</p></Link>
            </section>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        cityObject: state.city.citySelected
    }
}

const mapDispatchToProps = {
    getCity: cityAction.readCity()
}

export default connect(mapStateToProps, mapDispatchToProps)(City)