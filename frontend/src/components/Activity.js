import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import activitiesAction from "../redux/actions/activitiesAction.js"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const Activity = (props) => {
    const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)
    const [listOfActivities, setListOfActivities] = useState([])

    useEffect(() => {
        props.getActivities(props.itineraryId)
        .then(res => {
            if (!res.success) {
                setConnectionWithAPI(res.error)
            } else {
                setListOfActivities(res.response)
            }
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderDiv = (text) => {
        return(
            <div className="withoutActivitiesDiv">
                <p>{text}</p>
            </div>
        )
    }

    return (
        loading === true ?
        renderDiv("Loading...") :
        connectionWithAPI === "connected" ?
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            {listOfActivities[0].activities.map((activity, index) => {
                return(
                    <div className="activityCarrouselImage" key={index} style={{backgroundImage : `url(${activity.image})`}}>
                        <p className="activityCarrouselTitle">{activity.title}</p>
                    </div>
                )
            })}
        </Carousel> :
        renderDiv(connectionWithAPI)
    )
}

const mapDispatchToProps = {
    getActivities: activitiesAction.readActivitiesByItineraryId
}

export default connect(null, mapDispatchToProps)(Activity)