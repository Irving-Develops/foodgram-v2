import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { addCommentThunk } from "../../store/comments";

function CreateComment(postId) {
    const dispatch = useDispatch()
    const [comment_text, setCommentText] = useState('')
    const [charCount, setCharCount] = useState(0)
    const [isDisabled, setIsDisabled] = useState(true)
    const user = useSelector(state => state.session.user.id)

    let lastClicked = 0

    const updateCommentText = (e) => {
        const comment_text = e.target.value
        if(e.target.value.length > 0 && e.target.value.length < 256) setIsDisabled(false)
        if(e.target.value.length === 0 || e.target.value.length > 255) setIsDisabled(true)
        setCommentText(comment_text)
        setCharCount(e.target.value.length)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const comment = {
            comment_text,
            post_id: postId.postId,
            user_id: user
        }

        if (Date.now() - lastClicked < 4000) return;
        lastClicked = Date.now()
        
        await dispatch(addCommentThunk(comment))

        setCommentText('')
        setCharCount(0)
        setIsDisabled(true)
    }

    return (
        
        <form onSubmit={handleSubmit} id={isDisabled ? "disabled" : null}  className="create-comment-form">
                <input
                    type="text"
                    
                    name="comment_text"
                    value={comment_text}
                    placeholder="Add a comment..."
                    onChange={updateCommentText}
                />
                {charCount > 255 || charCount === 0 ? <div data={charCount} className="invalid-charcount"></div>
                :
                <div data={charCount} className="charcount"></div>
                }
            <button disabled={isDisabled} type="submit">Post</button>
        </form>
    )
}

export default CreateComment