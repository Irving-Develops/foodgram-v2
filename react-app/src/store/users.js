const GET_USERS = 'users/GET_USERS'
// const ADD_USER = 'user/ADD_USER'
const EDIT_USER = 'user/EDIT_USER'

 export const getUsers = (users) => ({
    type: GET_USERS,
    users
})

export const editUser = (user) => ({
  type: EDIT_USER,
  user
})

export const getUsersThunk = () => async(dispatch) => {
    const res = await fetch(`/api/users`);

    if(res.ok) {
        const data = await res.json()
        dispatch(getUsers(data.users))
    }else {
        const err = await res.json()
    }
}

export const editUserThunk = (user) => async(dispatch) => {
  const {profile_pic} = user
  const formData = new FormData()
  formData.append('profile_pic', profile_pic)
  
  const res = await fetch(`/api/users/${user.id}`, {
    method: 'PUT',
    body: formData
  })
  console.log(res, "response")

  if(res.ok) {
    const user = await res.json();
    dispatch(editUser(user))
    return user
  }

}

export const followUserThunk = (user) => async(dispatch) => {
  const res = await fetch(`/api/users/follow/${user.id}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  
  if(res.ok) {
    const following = await res.json();
    dispatch(editUser(following))
    return following
  }
}

export const unfollowUserThunk = (user) => async(dispatch) => {
  const res = await fetch(`/api/users/unfollow/${user.id}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    if(res.ok) {
    const unfollowing = await res.json();
    dispatch(editUser(unfollowing))
    return unfollowing
  }
}


export default function userReducer(state = {}, action){
    let newState = {...state}
    switch (action.type) {
        case GET_USERS:
            action.users.forEach(user => newState[user.id] = user)
            return newState
        case EDIT_USER:
            newState[action.user.id] = action.user
            return newState
        default:
            return state;
    }
}