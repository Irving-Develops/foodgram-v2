import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteCommentThunk } from "../../store/comments"

const DeleteComment = ({comment, setDeleteModal, setShowButtons}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async() => {
       await dispatch(deleteCommentThunk(comment))
        setDeleteModal(false)
        setShowButtons(false)
        history.push('/')
    }

    return (
        <button className='delete' onClick={handleDelete} id="delete">Delete</button>
    )
}

export default DeleteComment