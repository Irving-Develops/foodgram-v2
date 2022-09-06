import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import classes from './User.module.css'
import { Modal } from '../Context/Modal';
import { getPostsThunk } from '../../store/posts';
import { getUsersThunk } from '../../store/users'
import EditProfile from './EditProfilePic';
import AllComments from '../Comments/AllComments';
import Follow from '../Follow/Follow';

function User() {
  const dispatch = useDispatch()
  const { userId }  = useParams();
  const [showEditModal, setEditModal] = useState(false)
  const location = useLocation()
  const [showCommentModal2, setCommentModal2] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const allUsers = useSelector(state => state.users)
  const posts = useSelector(state => state.posts)
  const user = Object.values(allUsers).filter(user => user.id === parseInt(userId))[0]
  const following = Object.values(allUsers).filter(otherUsers => otherUsers.followers.includes(user.id)).length

  let myPosts;
  if(posts){
    myPosts = Object.values(posts).filter(post => post.owner.id === parseInt(userId))
  } 

  useEffect(() => {
    dispatch(getPostsThunk())
    dispatch(getUsersThunk())
  }, [dispatch])


  if (!user) return null;
  return (
    <div className={classes.userContainer}>

      <div className={classes.userDetails}>

        <div className={classes.userImg}>
          <img src={user.profile_pic} alt={user.username} />
        </div>

        <div className={classes.detailsWrapper}>
          
          {sessionUser.id === user.id && (
            <div className={classes.userHeader}>
              <h2>{user.username}</h2>
              <button onClick={() => setEditModal(true)}>Edit Profile</button>
            </div>
          )}
          {user.id !== sessionUser.id ?
          <div className={classes.userHeader}>
            <h2>{user.username}</h2>
            <Follow user={user}/>
          </div>
          :
          null
          }

          <div className={classes.userStats}>
            { myPosts.length === 1 ?
            <p><span>{myPosts.length} </span>post</p>
            : 
            <p><span>{myPosts.length} </span>posts</p>
            }
            <p><span>{user.followers.length} </span>follower</p>
            <p><span>{following} </span>following</p>
          </div>

          {showEditModal && sessionUser.id === user.id &&  (
            <Modal className={classes.modalContainer} onClose={() => {
              setEditModal(false)
            }}>
              <div className={classes.modalHeader}>
                <button onClick={() => setEditModal(false)}>Cancel</button>
                <p>Edit Profile Picture</p>
              </div>
              <div className={classes.modalBody}>
                <div className={classes.imgContainer}>
                  <img src={user.profile_pic} alt={user.username} />
                </div>
                <div className={classes.icon}>
                  <svg aria-label="Icon to represent media such as images or videos" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                  <EditProfile user={user} setEditModal={setEditModal}/>
                </div>
              </div>
            </Modal>
          )}

          <span>{user.full_name}</span>

        </div>

      </div>


      <div className={classes.userPostsContainer}>
          {myPosts  && myPosts.map(post =>  (
            <div className={classes.imgWrapper} key={post.id}>
              <img src={post.img_url} alt="image" /> 
              <AllComments post={post} isSvg={false} isOverlay={true}/>
            </div>
          ))}
      </div>

    </div>

  );
}
export default User;
