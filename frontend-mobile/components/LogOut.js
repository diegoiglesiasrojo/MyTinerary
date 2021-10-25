import React, {useEffect} from "react"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"

const LogOut = (props) => {
    useEffect(() => {
        props.logOutUser()
        props.navigation.navigate('HomeStack')
    }, [])

    return null
}

const mapDispatchToProps = {
    logOutUser: usersAction.logOut
}

export default connect(null, mapDispatchToProps)(LogOut)