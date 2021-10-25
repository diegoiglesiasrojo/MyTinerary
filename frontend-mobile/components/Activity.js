import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import activitiesAction from "../redux/actions/activitiesAction.js"
import {View, Text, ActivityIndicator, ImageBackground, StyleSheet} from "react-native"

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

    const renderView = (text) => {
        return(
            <Text style={styles.withoutActivitiesText}>{text}</Text>
        )
    }

    const renderLoading = () => {
        return (
            <ActivityIndicator size={"large"} color={"black"}/>
        )
    }

    return (
        loading === true ?
        renderLoading() :
        connectionWithAPI === "connected" ?
        <View style={styles.activitiesView}>
            <ImageBackground style={styles.activityImage} source={{uri: listOfActivities[0].activities[0].image}}>
                <Text style={styles.activityTitle}>{listOfActivities[0].activities[0].title}</Text>
            </ImageBackground>
        </View> :
        renderView(connectionWithAPI)
    )
}

const mapDispatchToProps = {
    getActivities: activitiesAction.readActivitiesByItineraryId
}

export default connect(null, mapDispatchToProps)(Activity)

const styles = StyleSheet.create({
    withoutActivitiesText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10
    },
    activitiesView: {
        width: "90%",
        alignItems: "center",
        margin: 10
    },
    activityImage: {
        width: "100%",
        height: 200,
        alignItems: "center"
    },
    activityTitle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#EDEDED",
        backgroundColor: "#171717",
        padding: 5,
        borderRadius: 10,
        opacity: 0.8,
        marginTop: 10
    }
})