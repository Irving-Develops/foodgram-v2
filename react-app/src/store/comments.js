const GET_COMMENTS = 'comments/GET_COMMENTS'
const ADD_COMMENT = 'comments/ADD_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
// const GET_COMMENTS_OF_POSTS ='comments/GET_COMMENTS_OF_POSTS'

export const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
})

// export const getCommentsOfPost = (comments) => ({
//     type: GET_COMMENTS_OF_POSTS,
//     comments
// })

export const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

export const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

export const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
})

export const getCommentsThunk = () => async(dispatch) => {
    const res = await fetch(`/api/comments`)

    if(res.ok) {
        const data = await res.json()
        dispatch(getComments(data.comments))
    }else {
      const err = await res.json();
      throw err;
    }
}

export const getCommentsOfPostsThunk = (postId) => async(dispatch) => {
    const res = await fetch(`/api/comments/${postId}`)

    if(res.ok) {
        const data = await res.json()
        dispatch(getComments(data.comments))
    }else {
      const err = await res.json();
      throw err;
    }
}

export const addCommentThunk = (data) => async(dispatch) => {
    const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const comment = await res.json();
        dispatch(addComment(comment));
        return comment;
    }
    else {
        const err = await res.json();
        throw err;
    }
}
export const editCommentThunk= (comment) => async(dispatch) => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const comment = await res.json();
        dispatch(editComment(comment));
        return comment;
    }
    else {
        const err = await res.json();
        throw err;
    }
}

export const deleteCommentThunk = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    let data = await response.json();
    dispatch(deleteComment(comment));
    return data;
  }
  else {
    const err = await response.json();
    throw err;
  }
}

export default function commentReducer(state = {}, action){
    let newState = {...state} 
    switch (action.type){
        case GET_COMMENTS:
            action.comments.forEach((comment) => newState[comment.id] = comment);
        return newState
        // case GET_COMMENTS_OF_POSTS:
        //     action.comments.forEach((comment) => newState[comment.id] = comment);
        // return newState
        case ADD_COMMENT:
            newState[action.comment.id] = action.comment;
        return newState;
        case EDIT_COMMENT:
            newState[action.comment.id] = action.comment;
        return newState;
        case DELETE_COMMENT:
          delete newState[action.comment.id];
        return newState;
    default:
        return state;
    }
}