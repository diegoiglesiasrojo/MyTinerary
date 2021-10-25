import React, {useState} from "react"
import {View, Text, StyleSheet} from "react-native"
import Activity from "./Activity.js"
import Comments from "./Comments.js"

const ItineraryAside = (props) => {
    const [dropDown, setDropDown] = useState(false)
    const handleDropDown = () => {
        setDropDown(!dropDown)
    }

    const renderActivitiesAndComments = () => {
        return(
            <View style={styles.itineraryViewDropDownContainer}>
                <Activity itineraryId={props.id}/>
                <Comments itineraryId={props.id} itineraryComments={props.comments}/>
            </View>
        )
    }

    return (
        <View style={styles.asideView}>
            {dropDown && renderActivitiesAndComments()}
            <Text style={styles.itineraryTextDropDown} onPress={() => {handleDropDown()}}>{dropDown ? "View Less" : "View More"}</Text>
        </View>
    )
}

export default ItineraryAside

const styles = StyleSheet.create({
    asideView: {
        width: "100%",
        alignItems: "center"
    },
    itineraryTextDropDown: {
        backgroundColor: "#DA0037",
        color: "#EDEDED",
        padding: 10,
        borderRadius: 20,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    itineraryViewDropDownContainer: {
        width: "100%",
        minHeight: 100,
        borderColor: "#171717",
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 20,
        alignItems: "center",
    }
})