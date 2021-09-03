import React from "react"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"

const Settings = () => {
    
    return (
        <main>
            <p style={{color: "white", margin: "10px"}}>WIP</p>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.users.userId,
        token: state.users.token
    }
}

const mapDispatchToProps = {
    updateUser: usersAction.updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)