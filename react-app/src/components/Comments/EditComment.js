import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import { editCommentThunk } from "../../store/comments";

function EditComment({comment, setEditModal, setShowButtons}) {
    const dispatch = useDispatch();
    const [comment_text, setCommentText] = useState(comment.comment_text)
    const [charCount, setCharCount] = useState(comment.comment_text.length)
    const [isDisabled, setIsDisabled] = useState(false)

    
    const updateCommentText = (e) => {
        // const comment = e.target.value
        setCharCount(e.target.value.length)
        if(e.target.value.length > 0 && e.target.value.length < 256) setIsDisabled(false)
        if(e.target.value.length === 0 || e.target.value.length >= 256) setIsDisabled(true)
        setCommentText(e.target.value)
    }


    const handleSubmit = async(e) => {
        e.preventDefault()

        const editedComment = {
            id: comment.id,
            comment_text,
            post_id: comment.post_id,
            user_id: comment.user_id
        }

        await dispatch(editCommentThunk(editedComment))

        setCommentText('')
        setCharCount(0)
        setIsDisabled(true)
        setEditModal(false)
        setShowButtons(false)
    }

    return (
        <form onSubmit={handleSubmit} id={isDisabled ? "disabled" : null} className="create-comment-form">
            <input 
                type="text"
                name="comment_text"
                onChange={updateCommentText}
                value={comment_text}
            />
            <div data={charCount} className="charcount">
            </div>
            <button disabled={isDisabled} type="submit">Edit</button>
        </form>
    )
}
export default EditComment