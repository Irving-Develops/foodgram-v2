import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import { editPostThunk } from "../../store/posts";


function EditPost({post, setEditModal, setShowButtons}) {
    const dispatch = useDispatch()

    const [img_url,] = useState(post.img_url)
    const [caption, setCaption] = useState(post.caption)
    const [charCount, setCharCount] = useState(post.caption.length)
    const [isDisabled, setIsDisabled] = useState(false)


    // const updateImgUrl = (e) => {
    //     const img = e.target.files[0]
    //     setImgUrl(img)
    // }

    const updateCaption = (e) => {
        const caption = e.target.value
        setCharCount(e.target.value.length)
        if(e.target.value.length >= 0 && e.target.value.length < 256) setIsDisabled(false)
        if(e.target.value.length >= 256) setIsDisabled(true)
        setCaption(caption)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const editedPost = {
            id: post.id,
            img_url,
            caption
        }

        await dispatch(editPostThunk(editedPost))
        setCaption('')
        setCharCount(0)
        setIsDisabled(true)
        setEditModal(false)
        setShowButtons(false)
    }

    return (
        <form onSubmit={handleSubmit} id={isDisabled ? "disabled" : null} >
            {/* <input
              type="file"
              accept="image/*"
              onChange={updateImgUrl}
            /> */}
            <button disabled={isDisabled} type="submit">Done</button>
            <textarea 
                type="text"
                name="caption"
                placeholder="Write a caption..."
                onChange={updateCaption}
                value={caption}
            />
            {charCount > 255 ? <div data={charCount} className="invalid-charcount"></div>
            :
            <div data={charCount} className="charcount"></div>
            }  
        </form>
    )

}

export default EditPost