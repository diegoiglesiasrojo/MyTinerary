import React from "react"
import {View, ImageBackground, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Entypo } from '@expo/vector-icons'

const Home = (props) => {
    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight, flex: 1}}>
            <ScrollView>
                <Header/>
                <View style={styles.homeMain}>
                    <ImageBackground style={styles.backgroundImage} source={{uri: "https://i.postimg.cc/FRKd8mkM/berlin-Background.jpg"}}>
                        <Text style={styles.titleHome}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
                        <View style={styles.callToActionContainer}>
                            <Entypo style={styles.arrowHome} name="arrow-down" size={150} color="black" />
                            <Text style={styles.callToActionHome} onPress={() => {props.navigation.navigate('CitiesStack')}}>Go to discover a City</Text>
                        </View>
                    </ImageBackground>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Home

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    homeMain: {
        minHeight: height-StatusBar.currentHeight-160,
        backgroundColor: "#444444",
    },
    backgroundImage: {
        width: "100%",
        height: height-StatusBar.currentHeight-160,
        alignItems: "center",
        justifyContent: "space-between"
    },
    titleHome: {
        color: "#EDEDED",
        fontSize: 30,
        textAlign: "center",
        backgroundColor: "#171717",
        borderRadius: 25,
        padding: 10,
        fontWeight: "bold",
        margin: 20,
        opacity: 0.8
    },
    callToActionContainer: {
        alignItems: "center"
    },
    arrowHome: {
        color: "#DA0037"
    },
    callToActionHome: {
        color: "#EDEDED",
        fontSize: 20,
        textAlign: "center",
        backgroundColor: "#DA0037",
        borderRadius: 20,
        padding: 10,
        fontWeight: "bold",
        margin: 20
    }
})
/*
#171717
#444444
#DA0037
#EDEDED
*/