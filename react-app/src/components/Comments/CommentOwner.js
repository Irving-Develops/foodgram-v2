import {useState} from 'react'
import { useSelector } from 'react-redux';
import TimeSince from '../../TimeSince';
import EditCommentModal from '../Modals/EditCommentModal';

function CommentOwner({comment, showPic}) {

    const sessionUser = useSelector(state => state.session.user.id)
    const [showButtons, setShowButtons] = useState(false)
    // let date = comment.created_at.getTime()

    return (
        <div className="comment-container" >
            <div id='main-line'>
                {!showPic && (
                <div className='user-img'>
                    <img src={comment.owner.profile_pic} alt={comment.owner.username}/>
                </div>
                )}
                <div id='comment-text'>
                    {/* <NavLink to={`/users/${comment.owner.id}`}>{comment.owner.username}</NavLink> */}
                    <span id="owner">{comment.owner.username}</span>
                    <span>{comment.comment_text}</span>
                    <TimeSince date={comment.created_at} />
                </div>
                {sessionUser === comment.owner.id && !showButtons &&(
                    <div className='drop-down'>
                        <svg onClick={() => setShowButtons(true)} aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                    </div>
                    )}
                    {showButtons && (
                        <div id="user-profile-modal">   
                            <EditCommentModal comment={comment} setShowButtons={setShowButtons}/>
                        </div>
                    )}
            </div>
        </div>
    )

}
    
    export default CommentOwner