const GET_CHATROOMS = 'chatrooms/GET_CHATROOMS'
const GET_CHATROOM = 'chatroom/GET_CHATROOM'
const ADD_CHATROOM = 'chatroom/ADD_CHATROOM'


export const getChatrooms = (chatrooms) => ({
    type: GET_CHATROOMS,
    chatrooms
})

export const getChatroom = (chatroom) => ({
    type: GET_CHATROOM,
    chatroom
})

export const addChatroom = (chatroom) => ({
    type: ADD_CHATROOM,
    chatroom
})

export const getChatroomsThunk = () => async(dispatch) => {
    let res = await fetch('/api/chatrooms')

    if(res.ok) {
        const data = await res.json()
        dispatch(getChatrooms(data.chatrooms))
    }
}

export const getChatroomThunk = (chatroomId) => async(dispatch) => {
    let res = await fetch(`/api/chatrooms/${chatroomId}`)

    if(res.ok) {
        const data = await res.json()
        console.log(data, "data in thunk")
        dispatch(getChatroom(data))
    }
}

export const addChatroomThunk = (data) => async(dispatch) => {
    // console.log(data, "data; in add")
    const res = await fetch('/api/chatrooms', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const chatroom = await res.json();
        dispatch(addChatroom(chatroom));
        return chatroom;
    }
    else {
        const err = await res.json();
        throw err;
    }
}

export default function commentReducer(state = {}, action){
    let newState = {...state} 
    switch (action.type){
        case GET_CHATROOMS:
            action.chatrooms.forEach((chatroom) => newState[chatroom.id] = chatroom);
        return newState
        case GET_CHATROOM:
            console.log(action.chatroom, "in reducer chatroom")
            // newState[action.chatroom.id] = action.chatroom
        return newState
        case ADD_CHATROOM:
            newState[action.chatroom.id] = action.chatroom;
        return newState;
    default:
        return state;
    }
}