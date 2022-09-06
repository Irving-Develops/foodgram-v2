import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getMessagesThunk} from '../../store/messages'


export default function LastMessage({chatroomId}) {
    console.log(chatroomId)
    const dispatch = useDispatch()
    const messageObj = useSelector(state => state.messages)
    const [lastMessage, setLastMessage] = useState("")
    let arr;
    if(messageObj) {
        arr = Object.values(messageObj)
    }
    console.log(arr, "Arr")
    useEffect(() => {
        dispatch(getMessagesThunk(chatroomId))
    }, [dispatch])

    if(!messageObj || arr.length === 0) return null
    return (
            <span>{arr[arr.length-1].message}</span>
    )
}