const GET_POSTS = 'posts/GET_POSTS'
const ADD_POST = 'posts/ADD_POST'
const EDIT_POST = 'posts/EDIT_POST'
const DELETE_POST = 'post/DELETE_POST'

export const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
})

export const addPost = (post) => ({
    type: ADD_POST,
    post
})

export const editPost = (post) => ({
    type: EDIT_POST,
    post
})

export const deletePost = (post) => ({
    type: DELETE_POST,
    post
})

export const getPostsThunk = () => async(dispatch) => {
    const res = await fetch('/api/posts');

    if(res.ok) {
        const data = await res.json()
        dispatch(getPosts(data.posts))
    } else {
      const err = await res.json();
      throw err;
    }
}

export const addPostThunk = (post) => async(dispatch) => {
    const {img_url, caption} = post
    
    const formData = new FormData()
    formData.append('img_url', img_url)
    formData.append('caption', caption)

    console.log(Object.values(formData), "formdata inside thunk")
    
    const res = await fetch('/api/posts', {
        method: "POST",
        body: formData
    });

    console.log(res, "body in thunk")
    
    if (res.ok) {
        const post = await res.json();
        dispatch(addPost(post))
        return post
    }
}

export const editPostThunk= (post) => async(dispatch) => {
    const {id, img_url, caption} = post
    const formData = new FormData()
    formData.append('img_url', img_url)
    formData.append('caption', caption)
    
    const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: formData
    })
    if (res.ok) {
        const post = await res.json();
        dispatch(editPost(post));
        return post;
    }
    else {
        const err = await res.json();
        throw err;
    }
}
export const deletePostThunk = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    await response.json();
    dispatch(deletePost(post));
    return post;
  }
  else {
    const err = await response.json();
    throw err;
  }
}

export const addLikeThunk = (post) => async(dispatch) => {
    const res = await fetch(`/api/likes/${post.id}/like`,{
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })

    if(res.ok) {
        const like = await res.json();
        dispatch(editPost(like))
        return like
    }
}

export const removeLikeThunk = (post) => async(dispatch) => {
        const res = await fetch(`/api/likes/${post.id}/unlike`,{
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        if(res.ok) {
        const like = await res.json();
        dispatch(editPost(like))
        return like
    }
}


export default function postReducer(state = {}, action){
    let newState = {...state} 
    switch (action.type){
        case GET_POSTS:
            action.posts.forEach((post) => newState[post.id] = post);
        return newState
        case ADD_POST:
            newState[action.post.id] = action.post;
        return newState;
        case EDIT_POST:
            newState[action.post.id] = action.post;
        return newState;
        case DELETE_POST:
          delete newState[action.post.id];
        return newState;
    default:
        return state;
    }
}