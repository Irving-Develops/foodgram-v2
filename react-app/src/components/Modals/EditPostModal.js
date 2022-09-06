import {useState} from 'react'
import { NavLink } from 'react-router-dom'
import EditPost from '../Posts/EditPost'
import { Modal } from '../Context/Modal'
import './ModalCss/DeleteModal.css'
import DeletePost from '../Posts/DeletePost'

function EditPostModal({post, setShowButtons}) {
        const [showEditModal, setEditModal] = useState(false)
        const [showDeleteModal, setDeleteModal] = useState(false)


    return(
        <div id='post-buttons'>
            <button className='delete' onClick={() => {
                setDeleteModal(true) 
                // setShowButtons(false)
            }}>Delete</button>
            {/* <DeletePost post={post}/> */}

            {showDeleteModal && (
                <Modal onClose={() => {
                    setEditModal(false)
                }}>
                    <div id="delete-post-modal">
                        <div id="delete-header">
                            <h5>Delete post?</h5>
                            <p>Are you sure you want to delete this post?</p>
                        </div>
                        <div id='post-modal-buttons'>
                            <button onClick={() => setDeleteModal(false)}>Cancel</button>
                            <DeletePost post={post} setDeleteModal={setDeleteModal} setShowButtons={setShowButtons}/>
                        </div>
                    </div>
                </Modal>
            )} 


            <button onClick={() => setEditModal(true)}>Edit</button>
            {showEditModal && (
                <Modal onClose={() => {
                    setEditModal(false)
                }}>
                    <div id="edit-post-modal">
                        <div id='head'>
                            <button id="cancel" onClick={() => {
                                setEditModal(false)
                                setShowButtons(false)
                                }}>Cancel</button>
                            <span>Edit Post</span>
                            <div id="empty"></div>
                        </div>
                        <div id="edit-post-content">
                            <div className='post-edit'>
                                <img src={post.img_url} alt="post.id" />
                            </div>  
                            <div id="caption">
                                <div className="user-container" id="edit">
                                    <div className="user-img" id="user-img">
                                        <img id="profile-pic" src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt={post.owner.username}/>
                                    </div>
                                    <div className="username">
                                        <NavLink to={`/users/${post.owner.id}`}>{post.owner.username}</NavLink>
                                    </div>
                                </div>
                                <EditPost post={post} setEditModal={setEditModal} setShowButtons={setShowButtons}/>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}


            <button onClick={()=> setShowButtons(false)}>Cancel</button>
        </div>
    )
}

export default EditPostModal