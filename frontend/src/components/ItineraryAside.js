import React, {useState} from "react"
import Activity from "./Activity.js"

const ItineraryAside = (props) => {
    const [dropDown, setDropDown] = useState(false)
    const handleDropDown = () => {
        setDropDown(!dropDown)
    }

    const renderActivities = () => {
        return(
            <div className="itineraryDivDropDownContainer" style={{display: dropDown ? "flex" : "none"}}>
                <Activity itineraryId={props.id}/>
            </div>
        )
    }
// console.log(props.comments) comments WIP

    return (
        <aside>
            {dropDown && renderActivities()}
            <div className="itineraryDivDropDown" onClick={handleDropDown}>{dropDown ? "View Less" : "View More"}</div>
        </aside>
    )
}

export default ItineraryAside