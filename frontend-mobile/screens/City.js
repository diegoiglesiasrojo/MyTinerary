import React from "react"
import {View, Text, ImageBackground, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"
import {connect} from "react-redux"
import Itineraries from "../components/Itineraries.js"

const City = (props) => {
    let citySelected = props.listOfCities.filter(city => city._id === props.route.params.id)
    citySelected = citySelected[0]

    const renderCity = () => {
        return (
            <>
                <View style= {styles.cityContainerView}>
                    <ImageBackground source={{uri: citySelected.cityImage}} style={styles.cityContainerImage}>
                        <Text style={styles.cityText}>{citySelected.cityName}</Text>
                    </ImageBackground>
                </View>
                <Itineraries cityId={props.route.params.id}/>
            </>
        )
    }

    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight}} >
            <ScrollView>
                <Header/>
                <View style={styles.cityMain}>
                    {renderCity()}
                    <Text style={styles.callToActionCities} onPress={() => {props.navigation.navigate('CitiesStack')}}>Come back to discover a City</Text>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        listOfCities: state.cities.listCities
    }
}

export default connect(mapStateToProps)(City)

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    cityMain: {
        minHeight: height-StatusBar.currentHeight-160,
        backgroundColor: "#444444",
        alignItems: "center"
    },
    cityContainerView: {
        width: "80%",
        height: 200,
        borderColor: "#171717",
        borderStyle: "solid",
        borderWidth: 10,
        borderRadius: 10,
        marginVertical: 20,
    },
    cityContainerImage: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    cityText: {
        color: "#EDEDED",
        fontSize: 30,
        backgroundColor: "#171717",
        borderRadius: 20,
        padding: 10,
        opacity: 0.8
    },
    callToActionCities: {
        backgroundColor: "#DA0037",
        color: "#EDEDED",
        padding: 10,
        borderRadius: 20,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 30
    }
})