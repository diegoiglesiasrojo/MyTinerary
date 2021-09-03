import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import itinerariesAction from "../redux/actions/itinerariesAction.js"
import ItineraryAside from "./ItineraryAside.js"
import {FaRegMoneyBillAlt} from "react-icons/fa"
import Likes from "./Likes.js"

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

    const renderPrice = (price) => {
        let money = []
        for (let i = 0; i < price; i++) {
            money.push(i)
        }
        return (
            money.map(bill => {
                return(
                    <FaRegMoneyBillAlt key={bill}/>
                )
            })
        )
    }

    const renderHashtags = (itinerary) => {
        return (
            itinerary.hashtags.map(hashtag => {
                return(
                    <p key={hashtag}>{`#${hashtag}`}</p>
                )
            })
        )
    }

    const renderItinerary = (itinerary) => {
        return (
            <section className="itinerarySection" key={itinerary._id}>
                <article>
                    <div className="itineraryTitle">
                        <h2>{itinerary.title}</h2>
                        <p>{itinerary.description}</p>
                    </div>
                    <div className="itineraryPublisherAndLikes">
                        <div className="itinenaryDivPublisher">
                            <div className="itinenaryDivImage" style={{backgroundImage : `url(${itinerary.publisherImage})`}}></div>
                            <div className="itinenaryDivPerson">
                                <p>{itinerary.publisherName}</p>
                                <p>{itinerary.publisherSurname}</p>
                            </div>
                        </div>
                        <Likes id={itinerary._id} likesArray={itinerary.likes}/>
                    </div>
                    <div className="itineraryDurationAndPrice">
                        <div className="itineraryDivDuration">
                            <p>Duration:</p>
                            <p>{itinerary.duration}hs</p>
                        </div>
                        <div className="itineraryDivPrice">
                            <p>Price:</p>
                            <p>{renderPrice(itinerary.price)}</p>
                        </div>
                    </div>
                    <div className="itineraryDivHashtags">
                    {renderHashtags(itinerary)}
                    </div>
                </article>
                <ItineraryAside id={itinerary._id} comments={itinerary.comments}/>
            </section>
        )
    }
    
    const renderSection = (text) => {
        return(
            <section className="itinerarySection">
                <p className="itinerarySectionMessage">{text}</p>
            </section>
        )
    }

    return(
        loading === true ?
        renderSection("Loading...") :
        connectionWithAPI === "connected" ?
        (props.listOfItineraries.length === 0 ?
        renderSection("There are not itineraries to see") :
        props.listOfItineraries.map(itinerary => {
            return (
                renderItinerary(itinerary)
            )
        }) 
        ) :
        renderSection(connectionWithAPI)
    )
}

const mapStateToProps = (state) => {
    return {
        listOfItineraries: state.itineraries.listItineraries,
        userId: state.users.userId
    }
}

const mapDispatchToProps = {
    getItineraries: itinerariesAction.readItineraries
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)