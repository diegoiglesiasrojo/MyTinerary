import React, {useState} from "react"
import Activity from "./Activity.js"
import Comments from "./Comments.js"

const ItineraryAside = (props) => {
    const [dropDown, setDropDown] = useState(false)
    const handleDropDown = () => {
        setDropDown(!dropDown)
    }

    const renderActivitiesAndComments = () => {
        return(
            <div className="itineraryDivDropDownContainer">
                <Activity itineraryId={props.id}/>
                <Comments itineraryId={props.id} itineraryComments={props.comments}/>
            </div>
        )
    }

    return (
        <aside>
            {dropDown && renderActivitiesAndComments()}
            <div className="itineraryDivDropDown" onClick={handleDropDown}>{dropDown ? "View Less" : "View More"}</div>
        </aside>
    )
}

export default ItineraryAside