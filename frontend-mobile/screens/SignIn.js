import React, {useState, useEffect} from "react"
import {View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"

const SignIn = (props) => {
    const [user, setUser] = useState({
        mail: "",
        password: ""
    })
    const [errors, setErrors] = useState("")

    const inputHandle = (e, typeOfValue) => {
        setUser({
            ...user,
            [typeOfValue]: e.nativeEvent.text
        })
    }

    const submitUser = (e) => {
        if (Object.keys(user).some(property => user[property] === "")) {
            setErrors("You must be write all the data")
        } else {
            props.logInUser(user)
            .then(res => {
                !res.success ?
                setErrors(res.error) :
                props.navigation.navigate('HomeStack')
            })
            .catch(e => console.log(e))
        }
    }

    const renderError = () => {
        return (
            <Text style={{opacity: errors === "" ? 0: 1, ...styles.error}}>{errors === "" ? "Error": errors}</Text>
        )
    }


    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight}} >
            <ScrollView>
                <Header/>
                <View style={styles.signInMain}>
                    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                        <View style={styles.formView}>
                            {renderError()}
                            <TextInput placeholder="Mail" placeholderTextColor="#9E9E9E" style={styles.input} onChange={(e) => {inputHandle(e, "mail")}}/>
                            <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor="#9E9E9E" style={styles.input} onChange={(e) => {inputHandle(e, "password")}}/>
                            <TouchableOpacity style={styles.signInButtom} onPress={submitUser}><Text style={styles.signInText}>Sign In</Text></TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.callToActionSignUp} onPress={() => {props.navigation.navigate('SignUpStack')}}>Don't have an account? Sign Up!</Text>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapDispatchToProps = {
    logInUser: usersAction.logIn,
}

export default connect(null, mapDispatchToProps)(SignIn)

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    signInMain: {
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
        textAlign: "center",
        marginTop: 10
    },
    signInButtom: {
        backgroundColor: "#171717",
        borderRadius: 7,
        padding: 8,
        marginVertical: 10,
        borderColor: "#9E9E9E",
        borderStyle: "solid",
        borderTopWidth: 2,
        borderLeftWidth: 2
    },
    signInText: {
        color: "#EDEDED",
        fontSize: 18,
        fontWeight: "bold",
    },
    callToActionSignUp: {
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