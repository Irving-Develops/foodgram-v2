import React, { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageThunk, deleteMessageThunk } from "../../store/messages";
import { io } from 'socket.io-client';
import classes from './Message.module.css'
import {getMessagesThunk} from '../../store/messages'
import { getChatroomThunk } from "../../store/chatrooms";
// import {deleteMessageThunk } from "../../store/messages";

import DeleteMessage from "./DeleteMessage";
import { useHistory } from "react-router-dom";


let socket;

export default function CreateMessage({chatroomId}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const messageState = useSelector(state => state.messages)
    // const chatroom = useSelector(state => state.chatrooms)
    const currentChatroom = Object.values(useSelector(state => state.chatrooms)).filter(chatroom => chatroom.id == chatroomId)
    const [originalMessages, setOriginalMessages] = useState(currentChatroom[0]?.messages)
    // let chatMessages = Object.values(messageState)
    // console.log(currentChatroom.message, "chatrooms")
    // console.log(chatroomId, "chat id")
    // const copy = [...chatMessages]
    const [socketToggle, setSocketToggle] = useState(false)
    // console.log(messageState, messages, "messages")

    // useEffect(() => {
    //     if(!socket.connected) {
    //         console.log(messages, "messages when disconnected")
    //     }
    // },[socket.connected])
    // useEffect(() => {
    //     dispatch(getChatroomThunk(chatroomId))
    //     console.log("dispatching")
    // }, [dispatch])

    // if(!originalMessages) {
    //     setOriginalMessages(currentChatroom[0]?.messages)
    // }

    console.log(originalMessages,  "msgs")
    console.log(currentChatroom[0]?.messages, "current chatroom messages")

    useEffect(() => {
        console.log("============= firing =============")
        dispatch(getMessagesThunk(chatroomId))
        setOriginalMessages(currentChatroom[0]?.messages)
        setMessages([])
    }, [history.location.pathname, currentChatroom[0]?.messages])


    useEffect(() => {
        dispatch(getMessagesThunk(chatroomId))
        setOriginalMessages(currentChatroom[0]?.messages)
    }, [dispatch])

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setSocketToggle(true)
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            console.log(messages, "messages in return")
            // dispatchMessages(messages)
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = async(e) => {
        e.preventDefault()
        let newMessage = { owner_id: user.id, message: chatInput, chatroom_id: chatroomId }
        await dispatch(addMessageThunk(newMessage))
        socket.emit("chat", newMessage);
        setChatInput("")
    }


    if(!originalMessages || !currentChatroom[0].messages) return null
    return (user && (
        <div>
            <div>
                {messages?.map((message, ind) => (
                    <div key={ind}>{`${message.owner_id}: ${message.message}`}</div>
                ))}
            </div>
            <div>
                {originalMessages.map((message, ind) => (
                    <div key={ind}>{`${message.owner}: ${message.message}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    ))
}