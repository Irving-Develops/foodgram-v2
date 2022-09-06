import React, {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {deleteMessageThunk } from "../../store/messages";


export default function DeleteMessage({message, socket, setMessages, chatroomId}){
    const dispatch = useDispatch()
    const messageObj = useSelector(state => state.messages)
    let chatroomMessages;
    if(messageObj) {
        chatroomMessages = Object.values(messageObj).filter(message => message.chatroom_id === chatroomId)
    }



    const handleDelete = async() => {
        let deletedMessage = await dispatch(deleteMessageThunk(message))
    }

    return (
        <button onClick={handleDelete}>Unsend</button>
    )

}