import React, {useEffect, useState} from "react";
import {useDispatch, useSelector, useStore} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { addChatroomThunk, getChatroomsThunk } from "../../store/chatrooms";


export default function CreateChatroom({user}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const chatrooms = useSelector(state => state.chatrooms)
    const [chatroomExists, setChatroomExists] = useState(false)
    let chatroomArr;
    if(chatrooms) {
        chatroomArr = Object.values(chatrooms).filter(chatroom => (chatroom.creator_id === sessionUser.id || chatroom.receiver_id === sessionUser.id) && (chatroom.receiver_id === user.id || chatroom.creator_id === user.id))
    }

    console.log(chatroomArr, "array")


    useEffect(() => {
        dispatch(getChatroomsThunk())
    }, [dispatch])


    const handleSubmit = async(e) => {
        e.preventDefault()
        
        let chatroom = {
            creator_id: sessionUser.id,
            receiver_id: user.id,  
        }

        if(chatroomArr && chatroomArr.length > 0) {
            history.push(`/messages/${chatroomArr[0].id}`)
        }else {
            let data = await dispatch(addChatroomThunk(chatroom))
            history.push(`/messages/${data.id}`)
        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <button>Message</button>
        </form>
    )
}