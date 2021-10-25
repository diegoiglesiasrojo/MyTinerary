import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import itinerariesAction from "../redux/actions/itinerariesAction.js"
import {View, Text, ActivityIndicator, Image, StyleSheet} from "react-native"
import ItineraryAside from "./ItineraryAside.js"
import Likes from "./Likes.js"
import { FontAwesome5 } from '@expo/vector-icons';

const Itineraries = (props) => {
    const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        props.getItineraries(props.cityId)
        .then(res => {
            if (!res.success) {
                setConnectionWithAPI(res.error)
            }
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.cityId])

    const renderPrice = (price) => {
        let money = []
        for (let i = 0; i < price; i++) {
            money.push(i)
        }
        return (
            money.map(bill => {
                return(
                    <View key={bill}>
                        <FontAwesome5 style={{marginHorizontal: 5}} name="money-bill-alt" size={24} color="green" />
                    </View>
                )
            })
        )
    }

    const renderHashtags = (itinerary) => {
        return (
            itinerary.hashtags.map(hashtag => {
                return(
                    <Text style={styles.itineraryHashtag} key={hashtag}>{`#${hashtag}`}</Text>
                )
            })
        )
    }

    const renderItinerary = (itinerary) => {
        return (
            <View style={styles.itinerarySection} key={itinerary._id}>
                <View style={styles.itineraryView}>
                    <View style={styles.itineraryTitle}>
                        <Text style={styles.itineraryTitleFirst}>{itinerary.title}</Text>
                        <Text style={styles.itineraryTitleSecond}>{itinerary.description}</Text>
                    </View>
                    <View style={styles.itineraryPublisherAndLikes}>
                        <View style={styles.itinenaryViewPublisher}>
                            <Image style={styles.itinenaryImage} source={{uri: itinerary.publisherImage}}/>
                            <View>
                                <Text style={styles.itinenaryPerson}>{itinerary.publisherName}</Text>
                                <Text style={styles.itinenaryPerson}>{itinerary.publisherSurname}</Text>
                            </View>
                        </View>
                        <Likes id={itinerary._id} likesArray={itinerary.likes}/>
                    </View>
                    <View style={styles.itineraryDurationAndPrice}>
                        <View>
                            <Text style={styles.itinenaryDurationText}>Duration:</Text>
                            <Text style={styles.itinenaryDurationText}>{itinerary.duration}hs</Text>
                        </View>
                        <View>
                            <Text style={styles.itinenaryPriceText}>Price:</Text>
                            <Text style={styles.itinenaryPriceText}>{renderPrice(itinerary.price)}</Text>
                        </View>
                    </View>
                    <View style={styles.itineraryViewHashtags}>
                        {renderHashtags(itinerary)}
                    </View>
                </View>
                <ItineraryAside id={itinerary._id} comments={itinerary.comments}/>
            </View>
        )
    }
    
    const renderSection = (text) => {
        return(
            <Text style={styles.textMessage}>{text}</Text>
        )
    }

    const renderLoading = () => {
        return (
            <ActivityIndicator size={"large"} color={"black"}/>
        )
    }

    return(
        loading === true ?
        renderLoading() :
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

const styles = StyleSheet.create({
    textMessage: {
        width: "80%",
        backgroundColor: "#EDEDED",
        color: "#171717",
        padding: 10,
        borderColor: "#171717",
        borderStyle: "solid",
        borderWidth: 5,
        borderRadius: 20,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20
    },
    itinerarySection: {
        width: "80%",
        alignItems: "center",
        backgroundColor: "#EDEDED",
        borderColor: "#171717",
        borderStyle: "solid",
        borderWidth: 5,
        borderRadius: 20,
        padding: 10,
        marginVertical: 10
    },
    itineraryView: {
        width: "100%",
        alignItems: "center"
    },
    itineraryTitle: {
        width: "100%",
    },
    itineraryTitleFirst: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        color: "#171717"
    },
    itineraryTitleSecond: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "#171717"
    },
    itineraryPublisherAndLikes: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 10
    },
    itinenaryViewPublisher: {
        flexDirection: "row",
        borderColor: "#DA0037",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 20,
        padding: 10
    },
    itinenaryImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10
    },
    itinenaryPerson: {
        fontSize: 20,
        color: "#171717"
    },
    itineraryDurationAndPrice: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 10
    },
    itinenaryDurationText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    itinenaryPriceText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    itineraryViewHashtags: {
        flexDirection: "row",
        justifyContent: "center"
    },
    itineraryHashtag: {
        fontSize: 17,
        marginHorizontal: 5
    }
})