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
    const messagesEndRef = useRef(null)
    const currentChatroom = Object.values(useSelector(state => state.chatrooms)).filter(chatroom => chatroom.id == chatroomId)
    const [originalMessages, setOriginalMessages] = useState(currentChatroom[0]?.messages)
    // let chatMessages = Object.values(messageState)
    // console.log(currentChatroom.message, "chatrooms")
    // console.log(chatroomId, "chat id")
    // const copy = [...chatMessages]
    const [socketToggle, setSocketToggle] = useState(false)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }
    let chatroomUser;

    if(chatroomId && currentChatroom) {
        chatroomUser = currentChatroom[0]?.otherUser
    }

    console.log(currentChatroom,  "current chatroom")
    console.log(currentChatroom[0]?.messages, "current chatroom messages")

    useEffect(() => {
        console.log("============= firing =============")
        dispatch(getMessagesThunk(chatroomId))
        setOriginalMessages(currentChatroom[0]?.messages)
        setMessages([])
        scrollToBottom()
    }, [history.location.pathname, currentChatroom[0]?.messages, dispatch])


    // useEffect(() => {
    //     dispatch(getMessagesThunk(chatroomId))
    //     setOriginalMessages(currentChatroom[0]?.messages)
    //     scrollToBottom()
    // }, [dispatch])


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
        scrollToBottom()
        socket.emit("chat", newMessage);
        setChatInput("")
    }

    // scrollToBottom()
    if(!originalMessages || !currentChatroom[0].messages) return (
        <div className={classes.noMsg}>
            <svg aria-label="Direct" class="_ab6-" color="#262626" fill="#262626" height="96" role="img" viewBox="0 0 96 96" width="96"><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="69.286" x2="41.447" y1="33.21" y2="48.804"></line><polygon fill="none" points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
            <h2>Your Messages</h2>
            <p>Send private photos and messages to a friend or group.</p>
        </div>
    )
    return (user && (
        <div className={classes.chatContainer}>
            <div className={classes.otherUsername}>
                <img src={chatroomUser?.profile_pic} alt={chatroomUser?.username}/>
                <p>{chatroomUser?.username}</p>
             </div>
            <div className={classes.messageContainer}>
                {originalMessages.map((message, ind) => (
                    <div key={ind} className={classes.messageWrapper}>
                        {message.owner_id === user.id  ?
                        <span className={classes.messageOwner}>{message.message}</span>
                        :
                        <span className={classes.otherUser}>{message.message}</span>

                    }
                    </div>

                ))}
                {messages?.map((message, ind) => (
                    <div key={ind} className={classes.messageWrapper}>
                        {message.owner_id === user.id  ?
                        <span className={classes.messageOwner}>{message.message}</span>
                        :
                        <span className={classes.otherUser}>{message.message}</span>

                    }
                    </div>

                ))}
            </div>
            <div ref={messagesEndRef} ></div>
            <form onSubmit={sendChat} className={classes.createMessage}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    ))
}