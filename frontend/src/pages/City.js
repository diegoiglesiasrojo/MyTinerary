import React, {useState, useEffect, useRef} from "react"
import {Link} from "react-router-dom"
import {FaTools} from "react-icons/fa"
import axios from "axios"

const City = (props) => {
    const [citySelected, setCitySelected] = useState({})
    let idToGet = useRef()
    idToGet = props.match.params.id

    useEffect(() => {
        window.scroll(0,0)
        axios.get(`http://localhost:4000/api/cities/${idToGet}`).then(res => setCitySelected(res.data.response))
    }, [])

    return (
        <main className="cityMain">
            <section className="cityIntroductionSection" style={{backgroundImage : `url(${citySelected.cityImage})`}} >
                {citySelected.cityName === undefined ? <h1>Loading...</h1> : <h1>{citySelected.cityName}</h1>}
            </section>
            <section className="cityItinerarySection">
                <p><span><FaTools/></span>Under construction<span><FaTools/></span></p>
            </section>
            <section className="cityReturnSection">
                <Link to="/cities"><p>Come back to discover a City</p></Link>
            </section>
        </main>
    )
}

export default City