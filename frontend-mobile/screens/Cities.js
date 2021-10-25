import React, {useState, useEffect} from "react"
import {View, Text, ActivityIndicator, ImageBackground, TouchableOpacity, TextInput, TouchableWithoutFeedback, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"
import {connect} from "react-redux"
import citiesAction from "../redux/actions/citiesAction.js"

const Cities = (props) => {
    const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        props.getCities()
        .then(res => {
            if (!res.success) {
                setConnectionWithAPI(res.error)
            }
            setLoading(false)
            props.getFilteredCities("")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inputHandler = (e) => {
        props.getFilteredCities(e.nativeEvent.text)
    }
    
    const renderCities = props.listOfFilteredCities.map(city => {
        return (
            <TouchableOpacity style={styles.cityContainer} key={city._id} onPress={() => {props.navigation.navigate('CityStack', {id: city._id})}}>
                <View style= {styles.cityContainerView}>
                    <ImageBackground source={{uri: city.cityImage}} style={styles.cityContainerImage}>
                        <Text style={styles.cityText}>{city.cityName}</Text>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        )
    })

    const noCities = (text) => {
        return(
            <Text style={styles.noCities}>{text}</Text>
        )
    }
    const renderLoading = () => {
        return (
            <ActivityIndicator size={"large"} color={"black"}/>
        )
    }

    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight}} >
            <ScrollView>
                <Header/>
                <View style={styles.citiesMain}>
                    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                        <>
                            <View style={styles.introductionView}>
                                <Text style={styles.introductionText}>What are you waiting for?</Text>
                                <Text style={styles.introductionText}>Your next destination awaits you</Text>
                                <TextInput placeholder="Search your city..." placeholderTextColor="#9E9E9E" style={styles.input} onChange={(e) => {inputHandler(e)}} />
                            </View>
                            <View style={styles.citiesContainer}>
                                {loading ?
                                renderLoading() :
                                connectionWithAPI === "connected" ?
                                (props.listOfFilteredCities.length === 0 ?
                                    noCities("There are no cities to see") :
                                    renderCities
                                    ) :
                                    noCities(connectionWithAPI)
                                }
                            </View>
                        </>
                    </TouchableWithoutFeedback>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        listOfFilteredCities: state.cities.listFilteredCities,
    }
}

const mapDispatchToProps = {
    getCities: citiesAction.readCities, 
    getFilteredCities: citiesAction.readFilteredCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    citiesMain: {
        minHeight: height-StatusBar.currentHeight-160,
        backgroundColor: "#444444",
        alignItems: "center"
    },
    introductionView: {
        width: "100%",
        alignItems: "center"
    },
    introductionText: {
        color: "#EDEDED",
        fontSize: 25,
        marginVertical: 20,
        backgroundColor: "#171717",
        borderRadius: 20,
        padding: 10
    },
    input: {
        width: "80%",
        backgroundColor: "#171717",
        borderRadius: 20,
        textAlign: "center",
        padding: 10,
        marginVertical: 20,
        color: "#EDEDED",
        fontSize: 30
    },
    citiesContainer: {
        width: "80%",
        alignItems: "center",
        marginVertical: 20
    },
    noCities: {
        borderColor: "#171717",
        borderStyle: "solid",
        borderWidth: 5,
        borderRadius: 20,
        backgroundColor: "#EDEDED",
        textAlign: "center",
        padding: 20,
        marginVertical: 20,
        color: "#171717",
        fontSize: 20,
        fontWeight: "bold",
    },
    cityContainer: {
        width: "100%"
    },
    cityContainerView: {
        width: "100%",
        height: 200,
        borderColor: "#171717",
        borderStyle: "solid",
        borderWidth: 10,
        borderRadius: 10,
        marginBottom: 20,
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
    }
})