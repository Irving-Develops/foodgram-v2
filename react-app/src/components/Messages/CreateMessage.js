import React, { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageThunk, deleteMessageThunk } from "../../store/messages";
import { io } from 'socket.io-client';
import classes from './Message.module.css'
import {getMessagesThunk} from '../../store/messages'
import { getChatroomsThunk } from "../../store/chatrooms";
// import {deleteMessageThunk } from "../../store/messages";

import DeleteMessage from "./DeleteMessage";


let socket;

export default function CreateMessage({chatroomId, setUpToDate, upToDate}) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState("");
    const user = useSelector(state => state.session.user)
    const messageObj = useSelector(state => state.messages)
    const chatrooms = useSelector(state => state.chatrooms)
    const messagesEndRef = useRef(null)

    console.log(chatrooms, "chatrooms")
    


    //scrolls to newest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }


    let chatroomUser;

    if(chatroomId && chatrooms) {
        chatroomUser = chatrooms[chatroomId]?.otherUser
    }

    
    let chatroomMessages;
    let formattedMsgs = []
    if(messageObj) {
        chatroomMessages = Object.values(messageObj).filter(message => message.chatroom_id === chatroomId)
        scrollToBottom()
    }

    
    const [messages, setMessages] = useState(chatroomMessages);

    
    const updateMessage = (e) => {
        setMessage(e.target.value)
    };

    useEffect(() => {
        if(chatroomId) {
            dispatch(getChatroomsThunk())
            dispatch(getMessagesThunk(chatroomId))
            setUpToDate(true)

        }
    }, [dispatch, chatroomId])

    useEffect(() => {
        setMessages(chatroomMessages)
    }, [messageObj])

    useEffect(scrollToBottom, [messageObj]);
    
    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            // let x = messages.slice(0, messages.length - 2) 
                if(chat.owner_id !== user.id) {
                    setMessages(messages => [...messages, chat])
                    scrollToBottom()
                }else {
                    setMessages(messages => [...messages])
                    scrollToBottom()
                }
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])


    const sendChat = async(e) => {
        e.preventDefault()



        const newMessage = {
            message,
            chatroom_id: chatroomId,
            owner_id: user.id,
        }

       let createdMsg = await dispatch(addMessageThunk(newMessage))
       await dispatch(getMessagesThunk(chatroomId))
       
       if(createdMsg) {
            // let data = { user: createdMsg.owner, msg: createdMsg.message, sender: createdMsg.owner_id , id: createdMsg.id}
            socket.emit("chat", createdMsg);
        }
        setUpToDate(false)
        setMessage("")
    }



    if(!messageObj || !chatroomUser || !messagesEndRef || !upToDate) 
    return (
        <div className={classes.noMsg}>
            <svg aria-label="Direct" class="_ab6-" color="#262626" fill="#262626" height="96" role="img" viewBox="0 0 96 96" width="96"><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="69.286" x2="41.447" y1="33.21" y2="48.804"></line><polygon fill="none" points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
            <h2>Your Messages</h2>
            <p>Send private photos and messages to a friend or group.</p>
        </div>
    )
    return (
        <div className={classes.chatContainer}>
                    <div className={classes.otherUsername}>
                        <img src={chatroomUser?.profile_pic} alt={chatroomUser?.username}/>
                        <p>{chatroomUser?.username}</p>
                    </div>
                    <div className={classes.messageContainer}>
                    {messages.length > 0 && messages.map((message, ind) => (
                    <div key={ind} className={classes.messageWrapper}>
                        {message.owner_id === user.id  ?
                        <span className={classes.messageOwner}>{message.message}</span>
                        :
                        <span className={classes.otherUser}>{message.message}</span>

                    }
                    </div>
                    ))}
                    <div  ref={messagesEndRef} />
                    </div>
                    <form onSubmit={sendChat} className={classes.createMessage}>
                        <input
                            value={message}
                            onChange={updateMessage}
                            placeholder="Message..."
                        />
                        <button type="submit">Send</button>
                    </form>
        </div>
    )
}