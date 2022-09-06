import React from "react"
import { useDispatch } from "react-redux"
import { deletePostThunk } from "../../store/posts"

const DeletePost = ({post, setDeleteModal, setShowButtons}) => {

    
    const dispatch = useDispatch()


    const handleDelete = async() => {
        await dispatch(deletePostThunk(post))
        setDeleteModal(false)
        setShowButtons(false)
    }

    if(!post) return null
    return (
            <button style={{color: "red"}} onClick={handleDelete} id="delete">Delete</button>
    )
}

export default DeletePost