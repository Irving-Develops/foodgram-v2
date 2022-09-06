import {useState} from 'react'
import EditPostModal from '../Modals/EditPostModal'
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'

function PostOwner({post}) {
    const [showButtons, setShowButtons] = useState(false);
    const sessionUser = useSelector(state => state.session.user.id)



    return (
        <div className="user-container">
            <div className='user-img'>
                <img src={post.owner.profile_pic ? `${post.owner.profile_pic}` : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt={post.owner.username}/>
            </div>
            <div className="username">
                <NavLink to={`/users/${post.owner.id}`}>{post.owner.username}</NavLink>
                {/* <span id="owner">{post.owner.username}</span> */}
            </div>
            {sessionUser === post.owner.id && !showButtons &&(
                <div className='drop-down'>
                    <svg onClick={() => setShowButtons(!showButtons)} aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                </div>
                )}
                {showButtons && (
                    <div id="user-profile-modal">   
                        <EditPostModal post={post} setShowButtons={setShowButtons}/>
                    </div>
                )}
        </div>
    )

}
    
    export default PostOwner