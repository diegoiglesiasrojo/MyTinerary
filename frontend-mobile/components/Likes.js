import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import itinerariesAction from "../redux/actions/itinerariesAction.js"
import {Text, TouchableOpacity, StyleSheet} from "react-native"
import { AntDesign } from '@expo/vector-icons'

const Likes = (props) => {
    const [likesToRender, setLikesToRender] = useState([])
    const [likeBoolean, setLikeBoolean] = useState(false)

    useEffect(() => {
        setLikesToRender(props.likesArray)
        props.likesArray.includes(props.userId) ? setLikeBoolean(true) : setLikeBoolean(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const changeLike = () => {
        if (props.userId) {
            props.changeLike(props.id, props.token, likeBoolean, props.userId)
            .then(res => {
                if (res.success) {
                    if (likeBoolean) {
                        const likesWithoutNewLike = likesToRender.filter(likeUserId => likeUserId !== props.userId)
                        setLikesToRender(likesWithoutNewLike)
                    } else {
                        let likesWithNewLike = likesToRender
                        likesWithNewLike.push(props.userId)
                        setLikesToRender(likesWithNewLike)
                    }
                    setLikeBoolean(!likeBoolean)
                } else {
                    console.log(res.error)
                }
            })
        }
    }

    return (
        <TouchableOpacity onPress={() => {changeLike()}}>
            <Text style={styles.itineraryTextLikes}>Likes:</Text>
            <Text style={styles.itineraryTextLikes}>{likesToRender.length} {likeBoolean ? 
                <AntDesign name="like1" size={24} color="#DA0037"/> :
                <AntDesign name="like2" size={24} color="#DA0037" />
            }</Text>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.users.userId,
        token: state.users.token
    }
}

const mapDispatchToProps = {
    changeLike: itinerariesAction.changeLike
}

export default connect(mapStateToProps, mapDispatchToProps)(Likes)

const styles = StyleSheet.create({
    itineraryTextLikes: {
        fontSize: 20
    },
})