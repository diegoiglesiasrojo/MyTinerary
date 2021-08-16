import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {FaTools} from "react-icons/fa"
import axios from "axios"

const City = (props) => {
    const [citySelected, setCitySelected] = useState({})
    const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderH1 = (text) => {
        return(
            <h1>{text}</h1>
        )
    }

    return (
        <main className="cityMain">
            <section className="cityIntroductionSection" style={{backgroundImage : `url(${citySelected.cityImage})`}} >
                {loading ?
                    renderH1("Loading...") :
                    (connectionWithAPI === "connected" ?
                        renderH1(citySelected.cityName) :
                        renderH1(connectionWithAPI)
                    )
                }
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