import {FaTools} from "react-icons/fa"
import React, {useState} from "react"

const ItineraryAside = (props) => {
    const [dropDown, setDropDown] = useState(false)
    const handleDropDown = () => {
        setDropDown(!dropDown)
    }

// console.log(props.comments) comments WIP

    return (
        <aside>
            <div className="cityItineraryDivDropDownContainer" style={{display: dropDown ? "flex" : "none"}}>
                <p><span><FaTools/></span>Under construction<span><FaTools/></span></p>
            </div>
            <div className="cityItineraryDivDropDown" onClick={handleDropDown}>{dropDown ? "View Less" : "View More"}</div>
        </aside>
    )
}

export default ItineraryAside