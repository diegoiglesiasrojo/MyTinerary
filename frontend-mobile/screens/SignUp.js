import React, {useState, useEffect} from "react"
import {View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard} from "react-native"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"
import Header from "../components/Header"
import Footer from "../components/Footer"

const SignUp = (props) => {
    const [user, setUser] = useState({
        name: "",
        surname: "",
        image: "",
        country: "World",
        mail: "",
        password: ""
    })
    // const [countries, setCountries] = useState([])
    const [errors, setErrors] = useState([])
    // useEffect(() => {
    //     props.getAllTheCountries()
    //     .then(res => {
    //         setCountries(res.response.data)
    //     })
    //     .catch(e => console.log(e))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const inputHandler = (e, typeOfValue) => {
        setUser({
            ...user,
            [typeOfValue]: e.nativeEvent.text
        })
    }

    const submitUser = () => {
        if (Object.keys(user).some(property => user[property] === "")) {
            setErrors([{path: ["failData"], message: "You must be write all the data"}])
        } else {
            props.signUpUser(user)
            .then(res => {
                !res.success ?
                setErrors(res.error) :
                props.navigation.navigate('HomeStack')
            })
            .catch(e => console.log(e))
        }
    }

    // const renderSelect = countries.map(country => {
    //     return(
    //         <option key={country.name} value={country.name}>{country.name}</option>
    //     )
    // })

    const renderError = (inputName) => {
        let errorToRender = errors.find(error => error.path[0] === inputName)
        return(
            <Text style={{opacity: errorToRender ? 1 : 0, ...styles.error}}>{errorToRender ? errorToRender.message: "Error"}</Text>
        )
    }

    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight}} >
            <ScrollView>
                <Header/>
                <View style={styles.signUpMain}>
                    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                        <View style={styles.formView}>
                            <TextInput placeholder="Name" placeholderTextColor="#9E9E9E" style={styles.input} onChange={(e) => {inputHandler(e, "name")}}/>
                            {renderError("name")}
                            <TextInput placeholder="Surname" placeholderTextColor="#9E9E9E" style={styles.input} onChange={(e) => {inputHandler(e, "surname")}}/>
                            {renderError("surname")}
                            <TextInput placeholder="Image url" placeholderTextColor="#9E9E9E" style={styles.input} onChange={(e) => {inputHandler(e, "image")}}/>
                            {renderError("image")}
                            <TextInput placeholder="Mail" placeholderTextColor="#9E9E9E" style={styles.input} onChange={(e) => {inputHandler(e, "mail")}}/>
                            {renderError("mail")}
                            <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor="#9E9E9E" style={styles.input} onChange={(e) => {inputHandler(e, "password")}}/>
                            {renderError("password")}
                            <TouchableOpacity style={styles.registerButtom} onPress={submitUser}><Text style={styles.registerText}>Register</Text></TouchableOpacity>
                            {renderError("failData")}
                            {renderError("failDataBase")}
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.callToActionSignIn} onPress={() => {props.navigation.navigate('SignInStack')}}>Do you have an account? Sign In!</Text>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapDispatchToProps = {
    signUpUser: usersAction.signUp,
    // getAllTheCountries: usersAction.getCountries
}

export default connect(null, mapDispatchToProps)(SignUp)

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    signUpMain: {
        minHeight: height-StatusBar.currentHeight-160,
        backgroundColor: "#444444",
        alignItems: "center"
    },
    formView: {
        borderColor: "#171717",
        borderStyle: "solid",
        borderWidth: 8,
        borderRadius: 20,
        width: "80%",
        marginTop: 20,
        alignItems: "center"
    },
    input: {
        width: "80%",
        backgroundColor: "#171717",
        borderRadius: 10,
        textAlign: "center",
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        color: "#EDEDED"
    },
    error: {
        color: "#DA0037",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },
    registerButtom: {
        backgroundColor: "#171717",
        borderRadius: 7,
        padding: 8,
        marginBottom: 10,
        borderColor: "#9E9E9E",
        borderStyle: "solid",
        borderTopWidth: 2,
        borderLeftWidth: 2
    },
    registerText: {
        color: "#EDEDED",
        fontSize: 18,
        fontWeight: "bold",
    },
    callToActionSignIn: {
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