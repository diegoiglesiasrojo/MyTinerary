import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"
import itinerariesAction from "../redux/actions/itinerariesAction.js"
import {View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator, StyleSheet} from "react-native"
import { FontAwesome } from '@expo/vector-icons';

const Comments = (props) => {
    const [loading, setLoading] = useState(true)
    const [commentsToRender, setCommentsToRender] = useState([])
    const [newComment, setNewComment] = useState("")
    const [error, setError] = useState("")
    const [inputForModify, setInputForModify] = useState("")
    const [confirmDelete, setConfirmDelete] = useState("")

    useEffect(() => {
        const commentsWithUsers = props.itineraryComments.map(async comment => {
            const res = await props.readUserComments(comment)
            return res
        })
        Promise.all(commentsWithUsers)
        .then(data => {
            setCommentsToRender(data)
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteComment = (commentId, userId) => {
        setConfirmDelete("")
        userId === props.userId &&
        props.deleteComment(commentId, props.itineraryId, props.token)
        .then(res => {
            if (res.success) {
                const commentsWithoutCurrentComment = commentsToRender.filter(comment => comment.response.commentId !== commentId)
                setCommentsToRender(commentsWithoutCurrentComment)
            } else {
                setError(res.error)
            }
        })
    }

    const renderConfirmDelete = (text, userId) => {
        userId === props.userId &&
        setConfirmDelete(text)
    }

    const submitChange = (commentId, userId, defaultValue, e) => {
        e.persist()
        setInputForModify("")
        userId === props.userId &&
        defaultValue !== e.nativeEvent.text &&
        props.updateComment(commentId, e.nativeEvent.text, props.token)
        .then(res => {
            if (res.success) {
                let commentsWithModification = commentsToRender.map(comment => {
                    if (commentId === comment.response.commentId) {
                        const commentModified = {
                            success: true,
                            response: {
                                ...comment.response,
                                comment: e.nativeEvent.text
                            }
                        }
                        return commentModified
                    } else {
                        return (
                            comment
                        )
                    }
                })
                setCommentsToRender(commentsWithModification)
            } else {
                setError(res.error)
            }
        })
    }

    const updateComment = (commentId, userId) => {
        userId === props.userId &&
        setInputForModify(commentId)
    }

    const renderComments = commentsToRender.map(comment => {
        return(
            <View style={styles.oneCommentContainer} key={comment.response.commentId}>
                <View style={styles.oneCommentUser}>
                    <Image style={styles.oneCommentUserImage} source={{uri: comment.response.image}}/>
                    <View>
                        <Text style={styles.oneCommentUserPerson}>{comment.response.name}</Text>
                        <Text style={styles.oneCommentUserPerson}>{comment.response.surname}</Text>
                    </View>
                </View>
                <View style={styles.oneCommentInputAndComment}>
                    {inputForModify === comment.response.commentId ? 
                    <TextInput style={styles.oneCommentInput} onEndEditing={(e) => submitChange(comment.response.commentId, comment.response.userId,comment.response.comment, e)} defaultValue={comment.response.comment}/> :
                    <Text style={styles.oneCommentText}>{comment.response.comment}</Text>
                    }
                    <View style={styles.oneCommentOptions}>
                        <TouchableOpacity style={{
                            opacity: comment.response.userId === props.userId ? 1: 0
                        }} onPress={() => renderConfirmDelete(comment.response.commentId, comment.response.userId)}>
                            <FontAwesome name="trash" size={40} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity className="oneCommentPen" style={{
                            opacity: comment.response.userId === props.userId ? 1: 0
                        }} onPress={() => updateComment(comment.response.commentId, comment.response.userId)}>
                            <FontAwesome name="pencil" size={40} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        display: confirmDelete === comment.response.commentId ?
                        "flex" : "none",
                        ...styles.oneCommentConfirmDelete
                    }}>
                        <Text style={styles.DeleteConfirmText}>Are you sure to delete this comment?</Text>
                        <View style={styles.DeleteConfirmOptions}>
                            <Text style={styles.DeleteConfirmOptionsText} onPress={() => deleteComment(comment.response.commentId, comment.response.userId)}>Yes</Text>
                            <Text style={styles.DeleteConfirmOptionsText} onPress={() => renderConfirmDelete("", comment.response.userId)}>No</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    })

    const inputHandle = (e) => {
        setNewComment(
            e.nativeEvent.text
        )
        setError("")
    }

    const submitNewComment = () => {
        if (!props.userId) {
            setError("You must be logged to send a comment")
        } else {
            if(newComment === "") {
                setError("You can't send an empty comment")
            } else {
                let newCommentObject = {
                    userId: props.userId,
                    comment: newComment,
                    commentId: parseInt(Math.random()*100000000) + props.userId
                }
                props.createComment(newCommentObject, props.itineraryId, props.token)
                .then(res => {
                    if (res.success) {
                        setError("")
                        newCommentObject = {
                            ...newCommentObject,
                            name: props.name,
                            surname: props.surname,
                            image: props.image
                        }
                        newCommentObject = {
                            success: true,
                            response: newCommentObject
                        }
                        let newCommentToPush = commentsToRender
                        newCommentToPush.push(newCommentObject)
                        setCommentsToRender([])
                        setCommentsToRender(newCommentToPush)
                    } else {
                        setError(res.error)
                    }
                })
            }
        }
    }

    const renderLoading = () => {
        return (
            <ActivityIndicator size={"large"} color={"black"}/>
        )
    }

    return (
        <View style={styles.commentsContainer}>
            {loading ?
            renderLoading() :
            renderComments
            }
            <View style={styles.commentsForm}>
                <TextInput style={styles.commentsFormInput} placeholderTextColor="#9E9E9E" editable={props.userId ? true : false} placeholder={props.userId ? "Comment..." : "Sign In to comment"} onChange={(e) => {inputHandle(e)}}/>
                <Text style={styles.commentsFormText} onPress={() => {submitNewComment()}}>Send</Text>
            </View>
            <Text style={{opacity: error !== "" ? 1: 0, ...styles.commentsError}}>{error !== "" ? error : "Error"}</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.users.userId,
        name: state.users.name,
        surname: state.users.surname,
        image: state.users.image,
        token: state.users.token
    }
}

const mapDispatchToProps = {
    readUserComments: usersAction.getUserComments,
    createComment: itinerariesAction.createComment,
    deleteComment: itinerariesAction.deleteComment,
    updateComment: itinerariesAction.updateComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)

const styles = StyleSheet.create({
    commentsContainer: {
        width: "100%",
        alignItems: "center"
    },
    oneCommentContainer: {
        width: "80%",
        alignItems: "center",
        borderColor: "#171717",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 10
    },
    oneCommentUser: {
        flexDirection: "row",
        margin: 10,
        alignSelf: "flex-start"
    },
    oneCommentUserImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10
    },
    oneCommentUserPerson: {
        fontSize: 18,
    },
    oneCommentInputAndComment: {
        width: "80%",
        alignItems: "center"
    },
    oneCommentInput: {
        width: "100%",
        backgroundColor: "#171717",
        borderRadius: 10,
        textAlign: "center",
        padding: 5,
        marginVertical: 10,
        color: "#EDEDED"
    },
    oneCommentText: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    oneCommentOptions: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 10
    },
    oneCommentConfirmDelete: {
        width: "100%",
        backgroundColor: "#444444",
        margin: 10,
        zIndex: 10,
        borderRadius: 20,
        padding: 10
    },
    DeleteConfirmText: {
        fontSize: 15,
        textAlign: "center",
        color: "#EDEDED",
        marginVertical: 2,
        zIndex: 10,
    },
    DeleteConfirmOptions: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        zIndex: 10
    },
    DeleteConfirmOptionsText: {
        color: "#EDEDED",
        backgroundColor: "#DA0037",
        fontSize: 20,
        borderRadius: 10,
        padding: 5,
        zIndex: 10
    },
    commentsError: {
        color: "#DA0037",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10
    },
    commentsForm: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
    },
    commentsFormInput: {
        width: "60%",
        backgroundColor: "#171717",
        borderRadius: 10,
        textAlign: "center",
        padding: 5,
        color: "#EDEDED"
    },
    commentsFormText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#EDEDED",
        backgroundColor: "#171717",
        padding: 7,
        borderRadius: 10,
        borderColor: "#9E9E9E",
        borderStyle: "solid",
        borderTopWidth: 2,
        borderLeftWidth: 2
    }
})