import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { getCommentsThunk } from "../../store/comments"
import './Comments.css'
import { Modal } from "../Context/Modal"
import CommentsModal from "../Modals/CommentsModal"
import CommentOwner from "./CommentOwner"

function AllComments({post, isSvg, isOverlay, postId}) {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)
    const sessionUser = useSelector(state => state.session.user.id)
    const [showCommentModal, setCommentModal] = useState(false)
    let showPic = true;

    let myComments;
    let commentsArr;
    let commentCount;

    if(comments){
        commentsArr = Object.values(comments).filter(comment => comment.post_id === post.id)
        commentCount = commentsArr.length
        myComments = commentsArr.filter(comments => comments.owner.id === sessionUser)
    }

    useEffect(() => {
        dispatch(getCommentsThunk())
    }, [dispatch])

    if(!comments) return null
    return (

        <div id="view-comments">
            {!isSvg && commentCount > 0 && !isOverlay &&(
                <p onClick={() => setCommentModal(true)}>view all {commentCount} comments</p>
            )}
            {isSvg && !isOverlay &&(
                <svg onClick={() => setCommentModal(true)} aria-label="Comment" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
            )}
            {isOverlay && (
                <div className="overlay" onClick={() => setCommentModal(true)} > </div>
            )}
            {showCommentModal && (
                <Modal onClose={() => {
                    setCommentModal(false)
                }}>
                    <CommentsModal commentsArr={commentsArr} post={post}/>
                </Modal>
            )}
            <div className="comments-container">
                {!isSvg && myComments && !isOverlay && myComments.map(comment => 
                    <CommentOwner key={comment.id} comment={comment} showPic={showPic}/>
                )}
            </div>
        </div>
    )
}


export default AllComments