import React, {useState} from "react"
import {FaTools} from "react-icons/fa"

const Itinerary = ({itinerary}) => {
    const [dropDown, setDropDown] = useState(false)
    const handleDropDown = () => {
        setDropDown(!dropDown)
    }

    const renderHashtags = itinerary.itineraryHashtags.map(hashtag => {
        return(
            <p key={hashtag}>{`#${hashtag}`}</p>
        )
    })    

    return(
        <>
            <article>
                <h2>{itinerary.itineraryTitle}</h2>
                <p>{itinerary.itineraryDescription}</p>
                <div className="cityItinenaryDivUser">
                    <div className="cityItinenaryDivImage" style={{backgroundImage : "url('/assets/black_hole.jpg')"}}></div>
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
                {renderHashtags}
                </div>
            </article>
            <aside>
                <div className="cityItineraryDivDropDown" onClick={handleDropDown}>{dropDown ? "View Less" : "View More"}</div>
                <div className="cityItineraryDivDropDownContainer" style={{display: dropDown ? "flex" : "none"}}>
                    <p><span><FaTools/></span>Under construction<span><FaTools/></span></p>
                </div>
            </aside>
        </>
    )
}

export default Itinerary