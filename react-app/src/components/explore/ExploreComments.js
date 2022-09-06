// import React, {useEffect, useState} from "react"
// import {useDispatch, useSelector} from 'react-redux'
// import { getCommentsThunk } from "../../store/comments"
// import { Modal } from "../Context/Modal"
// import CommentsModal from "../Modals/CommentsModal"

// function ExploreComments({post}) {
//     const dispatch = useDispatch()
//     const comments = useSelector(state => state.comments)
//     const sessionUser = useSelector(state => state.session.user.id)
//     const [showCommentModal, setCommentModal] = useState(false)


//     // let myComments;
//     let commentsArr;
//     // let commentCount;

//     if(comments){
//         commentsArr = Object.values(comments).filter(comment => comment.post_id === post.id)
//         commentCount = commentsArr.length
//         myComments = commentsArr.filter(comments => comments.owner.id === sessionUser)
//     }

//     useEffect(() => {
//         dispatch(getCommentsThunk())
//     }, [dispatch])

//     if(!comments) return null
//     return (
//         <div onClick={() => setCommentModal(true)} className="overlay">
//             {showCommentModal && (
//                 <Modal onClose={() => setCommentModal(false)}>
//                     <CommentsModal commentsArr={commentsArr} post={post}/>
//                 </Modal>
//             )}
//         </div>
//     )
// }


// export default ExploreComments