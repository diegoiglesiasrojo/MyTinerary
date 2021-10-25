import React from "react"
import {View, Text, StyleSheet, Image} from "react-native"
import {connect} from "react-redux"
import { FontAwesome5 } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const Header = (props) => {
    return (
        <View style={styles.header}>
            <View style={styles.logoHeader}>
                <Text style={styles.logoHeaderText}><FontAwesome5 style={styles.logoIcon} name="paper-plane" size={24} color="#EDEDED"/> MyTinerary</Text>
                <Text style={styles.logoHeaderText}>in Europe</Text>
            </View>
            <View>
                <Text style={styles.headerUserName}>Welcome </Text>
                <Text style={styles.headerUserName}>{props.userName ? props.userName : "stranger"}</Text>
            </View>
            <View>
                {props.userImage ?
                    <Image style={styles.headerUserImage} source={{uri: props.userImage}}/> :
                    <FontAwesome style={styles.headerUserIcon} name="user-circle-o" size={50} color="#EDEDED"/>
                }
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userName: state.users.name,
        userImage: state.users.image,
        userToken: state.users.token
    }
}

export default connect(mapStateToProps)(Header)

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#171717",
        height: 80,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    logoHeader: {
        marginLeft: 10
    },
    logoHeaderText: {
        color: "#EDEDED",
        fontSize: 24,
        fontWeight: "bold"
    },
    logoIcon: {
        marginRight: 10
    },
    headerUserName: {
        color: "#EDEDED",
        fontSize: 20,
        textAlign: "center"
    },
    headerUserIcon: {
        marginRight: 10
    },
    headerUserImage: {
        marginRight: 10,
        height: 60,
        width: 60,
        borderRadius: 50,
    },
})