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
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const messageState = useSelector(state => state.messages)
    let chatMessages = Object.values(messageState)
    console.log(chatMessages, "chat")
    console.log(messageState, messages, "messages")

    useEffect(() => {
        dispatch(getMessagesThunk(chatroomId))
    }, [dispatch])

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            messages.forEach(message => {
                console.log("dispatching")
                dispatch(addMessageThunk(message))
            } )
            socket.disconnect()
            console.log("disconnected")
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { owner_id: user.id, messages: chatInput, chatroomId: chatroomId });
        setChatInput("")
    }

    return (user && (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.owner_id}: ${message.messages}`}</div>
                ))}
            </div>
            <div>
                {chatMessages.map((message, ind) => (
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