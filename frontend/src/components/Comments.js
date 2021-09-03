import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction.js"
import itinerariesAction from "../redux/actions/itinerariesAction.js"
import {FaTrashAlt, FaPencilAlt} from "react-icons/fa"

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

    const submitChange = (commentId, userId, e) => {
        setInputForModify("")
        userId === props.userId &&
        e.target.defaultValue !== e.target.value &&
        props.updateComment(commentId, e.target.value, props.token)
        .then(res => {
            if (res.success) {
                let commentsWithModification = commentsToRender.map(comment => {
                    if (commentId === comment.response.commentId) {
                        const commentModified = {
                            success: true,
                            response: {
                                ...comment.response,
                                comment: e.target.value
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
            <div className="oneCommentContainer" key={comment.response.commentId}>
                <div className="oneCommentUser">
                    <div className="oneCommentUserImage" style={{backgroundImage : `url(${comment.response.image})`}}></div>
                    <div>
                        <p>{comment.response.name}</p>
                        <p>{comment.response.surname}</p>
                    </div>
                </div>
                <div>
                    {inputForModify === comment.response.commentId ? 
                    <input className="oneCommentInput" onBlur={(e) => submitChange(comment.response.commentId, comment.response.userId, e)} defaultValue={comment.response.comment}/> : 
                    <p className="oneCommentText">{comment.response.comment}</p>
                    }
                    <div className="oneCommentOptions">
                        <div className="oneCommentTrash" style={{
                            opacity: comment.response.userId === props.userId ? "1": "0", 
                            cursor: comment.response.userId === props.userId ? "pointer": "auto"
                        }} onClick={() => renderConfirmDelete(comment.response.commentId, comment.response.userId)}><FaTrashAlt/>
                        </div>
                        <div className="oneCommentPen" style={{
                            opacity: comment.response.userId === props.userId ? "1": "0", 
                            cursor: comment.response.userId === props.userId ? "pointer": "auto"
                        }} onClick={() => updateComment(comment.response.commentId, comment.response.userId)}><FaPencilAlt/>
                        </div>
                    </div>
                    <div className="oneCommentConfirmDelete" style={{
                        display: confirmDelete === comment.response.commentId ?
                        "flex": "none"
                    }}>
                        <p>Are you sure to delete this comment?</p>
                        <div>
                            <button onClick={() => deleteComment(comment.response.commentId, comment.response.userId)}>Yes</button>
                            <button onClick={() => renderConfirmDelete("", comment.response.userId)}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    const inputHandle = (e) => {
        setNewComment(
            e.target.value
        )
        setError("")
    }

    const submitNewComment = (e) => {
        e.preventDefault()
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

    return (
        <div className="commentsContainer">
            {loading ?
            <p>Loading...</p> :
            renderComments
            }
            <form className="commentsForm" onSubmit={submitNewComment}>
                <input className="commentsFormInput" style={{cursor: props.userId ? "pointer" : "not-allowed"}} disabled={props.userId ? false : true} type="text" placeholder={props.userId ? "Comment..." : "You must be logged to send a comment"} name="comment" onChange={inputHandle}/>
                <input className="commentsFormButtom" style={{cursor: props.userId ? "pointer" : "not-allowed"}} disabled={props.userId ? false : true} type="submit" value="Send"/>
            </form>
            <p className="commentsError" style={{opacity: error !== "" ? "1": "0"}}>{error !== "" ? error : "Error"}</p>
        </div>
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