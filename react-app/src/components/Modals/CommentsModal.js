// import React, {useEffect} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import PostUser from '../Posts/PostOwner'
import CommentOwner from '../Comments/CommentOwner'
import CreateComment from '../Comments/CreateComment'
import './ModalCss/CommentsModal.css'
// import {getCommentsOfPostsThunk} from '../../store/comments'

function CommentsModal({commentsArr, post}) {
    // const dispatch = useDispatch()
    // const comments = useSelector(state => state.comments)
    // let commentsArr;

    // if(comments){
    //     commentsArr = Object.values(comments).filter(comment => comment.post_id === post.id)
    // }

    // useEffect(() => {
    //     dispatch(getCommentsOfPostsThunk(post.id))
    // }, [dispatch])
    
        return (
            <div className='container'>
                <div className='post-img-container'>
                    <img src={post.img_url} alt="post"></img>
                </div>
                <div id="comments-comp-container" >
                    <div id='post-owner'>
                        <PostUser post={post} />
                    </div>
                    <div className='comments-container'>
                            {commentsArr.slice(0).reverse().map(comment => 
                                <CommentOwner key={comment.id} comment={comment} />
                            )}
                    <div className="create-comment-container" id="create-in-modal">
                        <CreateComment postId={post.id} />
                    </div>
                    </div>

                </div>

            </div>
        )

}

export default CommentsModal