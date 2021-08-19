import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import Itinerary from "../components/Itinerary.js"

const City = (props) => {
    const [citySelected, setCitySelected] = useState({})
    const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)
    const [AllItineraries, setAllItineraries] = useState([])
    const [connectionWithAPIItineraries, setConnectionWithAPIItineraries] = useState("connected")
    const [loadingItineraries, setLoadingItineraries] = useState(true)

    useEffect(() => {
        window.scroll(0,0)
        const getCityById = async () => {
            try {
                await axios.get(`http://localhost:4000/api/cities/${props.match.params.id}`)
                .then(res => {
                    if (res.data.success) {
                        setCitySelected(res.data.response)
                    } else {
                        throw new Error ("Fail to connect with the database")
                    }
                })
            } catch (error) {
                setConnectionWithAPI(
                    error.message.includes("database") ?
                    error.message :
                    "Fail to connect with the API"
                )
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        getCityById()

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
            <h1>{citySelected.cityName}</h1>
        )
    }

    const renderItineraries = AllItineraries.map(itinerary => {
        return (
            <section className="cityItinerarySection" key={itinerary._id}>
                <Itinerary itinerary={itinerary}/>
            </section>
        )
    })

    return (
        <main className="cityMain">
            <section className="cityIntroductionSection" style={{backgroundImage : `url(${citySelected.cityImage})`}} >
                {loading ?
                renderH("Loading...", "h1") :
                connectionWithAPI === "connected" ?
                renderCity() :
                renderH(connectionWithAPI, "h1")
                }
            </section>
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

export default City