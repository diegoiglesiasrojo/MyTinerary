import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import itinerariesAction from "../redux/actions/itinerariesAction.js"
import ItineraryAside from "./ItineraryAside.js"

const Itineraries = (props) => {
    const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scroll(0,0)
        props.getItineraries(props.cityId)
        .then(res => {
            if (!res.success) {
                setConnectionWithAPI(res.error)
            }
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderHashtags = (itinerary) => {
        return (
            itinerary.itineraryHashtags.map(hashtag => {
                return(
                    <p key={hashtag}>{`#${hashtag}`}</p>
                )
            })
        )
    }

    const renderItinerary = (itinerary) => {
        return (
            <section className="cityItinerarySection" key={itinerary._id}>
                <article>
                    <h2>{itinerary.itineraryTitle}</h2>
                    <p>{itinerary.itineraryDescription}</p>
                    <div className="cityItinenaryDivUser">
                        <div className="cityItinenaryDivImage" style={{backgroundImage : `url(${itinerary.itineraryPublisherImage})`}}></div>
                        <div className="cityItinenaryDivPerson">
                            <p>{itinerary.itineraryPublisherName}</p>
                            <p>{itinerary.itineraryPublisherSurname}</p>
                        </div>
                    </div>
                    <div className="cityItineraryDivDuration">
                        <p>Duration:</p>
                        <p>{itinerary.itineraryDuration}</p>
                    </div>
                    <div className="cityItineraryDivPrice">
                        <p>Price:</p>
                        <p>{itinerary.itineraryPrice}</p>
                    </div>
                    <div className="cityItineraryDivLikes">
                        <p>Likes:</p>
                        <p>{itinerary.itineraryLikes}</p>
                    </div>
                    <div className="cityItineraryDivHashtags">
                    {renderHashtags(itinerary)}
                    </div>
                </article>
                <ItineraryAside comments={itinerary.itineraryComments}/>
            </section>
        )
    }
    
    return(
        loading === true ?
        <section className="cityItinerarySection">
            <p>Loading...</p>
        </section> :
        connectionWithAPI === "connected" ?
        (props.listOfItineraries.length === 0 ?
        <section className="cityItinerarySection">
            <p>There are not itineraries to see</p>
        </section> :
        props.listOfItineraries.map(itinerary => {
            return (
                renderItinerary(itinerary)
            )
        }) 
        ) :
        <section className="cityItinerarySection">
            <p>{connectionWithAPI}</p>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        listOfItineraries: state.itineraries.listItineraries
    }
}

const mapDispatchToProps = {
    getItineraries: itinerariesAction.readItineraries
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)