// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const EDIT_USER = 'session/EDIT_USER'
const FOLLOW_USER = 'session/FOLLOW_USER'
const UNFOLLOW_USER = 'session/UNFOLLOW_USER'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const editUser = (user) => ({
  type: EDIT_USER,
  user
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (full_name, email, username, profile_pic, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      full_name,
      username,
      email,
      profile_pic,
      password,
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const demoLogin = () => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: "demo@aa.io",
      password: "password"
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
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

  if(res.ok) {
    const user = await res.json();
    dispatch(editUser(user))
    return user
  }

}

export const followUserThunk = (user) => async(dispatch) => {
  const res = await fetch(`/api/users/follow/${user.username}`, {
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
  const res = await fetch(`/api/users/unfollow/${user.username}`, {
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case EDIT_USER:
      return {user: action.payload}
    default:
      return state;
  }
}
