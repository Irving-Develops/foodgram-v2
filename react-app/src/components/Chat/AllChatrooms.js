import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useHistory} from 'react-router-dom'
import { getChatroomsThunk } from "../../store/chatrooms"
import { getUsersThunk } from "../../store/users"
import TimeSince from "../../TimeSince"
import CreateMessage from "../Messages/CreateMessage"
import LastMessage from "../Messages/LastMessage"
import classes from './Chatroom.module.css'

export default function Chatrooms(){
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const chatrooms = useSelector(state => state.chatrooms)
    const users = useSelector(state => state.users)
    const [chatroomId, setChatroomId] = useState(null)
    const [upToDate, setUpToDate] = useState(true)
    const [id, setId] = useState(parseInt(location.pathname.split('/')[2]))
    console.log(id, "id")

    let myChatrooms;
    let myChatArray;

     

    console.log(id)
    

    if(chatrooms){
        myChatrooms = Object.values(chatrooms).filter(room => {
            if(room.creator_id === sessionUser.id || room.receiver_id === sessionUser.id){
                return true
            }
        })
        
        myChatArray = Object.values(myChatrooms)

        myChatArray.map(room => {
            if(room.creator_id === sessionUser.id){
                room.otherUser = users[room.receiver_id]
            }else{
                room.otherUser = users[room.creator_id]
            }
        })
    }

    useEffect(() => {
        dispatch(getChatroomsThunk())
        dispatch(getUsersThunk())
        setUpToDate(true)
    }, [dispatch, upToDate])

    if(!myChatArray) return null
    return (
        <div className={classes.chatContainer}>
            <div className={classes.usersContainer}>

                <div className={classes.sessionUser}>
                    <span>{sessionUser.username}</span>
                </div>

                <div className={classes.otherUsers}>
                    {upToDate && myChatArray.length > 0 && myChatArray.map(chatroom => (
                        
                        <div className={classes.eachUser} key={chatroom.id}>
                            {chatroom.otherUser ? 
                                <div className={classes.userContainer} onClick={() => {
                                    setUpToDate(false)
                                    setId(chatroom.id)
                                    history.push(`/messages/${chatroom.id}`)
                                }}>
                                    <div className={classes.userImg}>
                                        <img src={chatroom.otherUser.profile_pic} alt={chatroom.otherUser.username}/>
                                    </div>
                                    <div className={classes.msgDetails}>
                                        <span>{chatroom.otherUser.username}</span>
                                            {chatroom.messages[chatroom.messages.length - 1] ? 
                                            <div className={classes.lastMessage}>
                                                <span>{chatroom.messages[chatroom.messages.length - 1].message}</span>
                                                {/* <LastMessage chatroomId={chatroom.id} /> */}
                                                <div className={classes.period}>&bull;</div>
                                                <TimeSince date={chatroom.messages[chatroom.messages.length - 1].created_at} />
                                            </div>
                                             :
                                            null
                                            }
                                    </div>
                                </div>
                            :
                            <img src="/static/loading.svg" alt="loading" />
                            }
                        </div>
                    ))}
                </div>
            </div>
            {id && id.length === 3 ?
            // <CreateMessage chatroomId={id[2]} setUpToDate={setUpToDate} upToDate={upToDate} />
            null
            :
            <CreateMessage chatroomId={id} setUpToDate={setUpToDate} upToDate={upToDate} />
        }
        </div>
    )
}