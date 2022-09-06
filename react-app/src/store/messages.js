const GET_MESSAGES = 'messages/GET_MESSAGES'
const ADD_MESSAGE = 'message/ADD_MESSAGE'
const DELETE_MESSAGE = 'message/DELETE_MESSAGE'


export const getMessages = (messages) => ({
    type: GET_MESSAGES,
    messages
})

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    message
})

export const deleteMessage = (message) => ({
    type: DELETE_MESSAGE,
    message
})

export const getMessagesThunk = (chatroomId) => async(dispatch) => {
    const res = await fetch(`/api/messages/${chatroomId}`)
    console.log(chatroomId, "in thunk")

    if(res.ok) {
        const data = await res.json()
        console.log(data, "in res")
        dispatch(getMessages(data.message))
    }else {
      const err = await res.json();
      throw err;
    }
}

export const addMessageThunk = (data) => async(dispatch) => {
    console.log(data, "data; in add")
    const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const message = await res.json();
        dispatch(addMessage(message));
        return message;
    }
    else {
        const err = await res.json();
        throw err;
    }
}

export const deleteMessageThunk = (message) => async(dispatch) => {
    const res = await fetch(`/api/messages/${message.id}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        let data = await res.json();
        dispatch(deleteMessage(message))
        return data
    }  else {
    const err = await res.json();
    throw err;
  }
}

export default function messageReducer(state = {}, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_MESSAGES:
            action.messages.forEach(message => newState[message.id] = message)
            return newState
        case ADD_MESSAGE:
            newState[action.message.id] = action.message;
        return newState;
        case DELETE_MESSAGE:
            delete newState[action.message.id];
            return newState
    default:
        return state;
    }
}