import {useState} from 'react'
import { Modal } from '../Context/Modal'
import './ModalCss/DeleteModal.css'
import DeleteComment from '../Comments/DeleteComment'
import EditComment from '../Comments/EditComment'

export default function EditCommentModal({comment, setShowButtons}) {
        const [showEditModal, setEditModal] = useState(false)
        const [showDeleteModal, setDeleteModal] = useState(false)
        
        return (
        <div id='post-buttons'>
            <button className='delete' onClick={() => setDeleteModal(true) }>Delete</button>
            {showDeleteModal && (
                <Modal onClose={() => {
                    setDeleteModal(false)
                }}>
                    <div id="delete-post-modal">
                        <div id="delete-header">
                            <h5>Delete comment?</h5>
                            <p>Are you sure you want to delete this comment?</p>
                        </div>
                        <div id='post-modal-buttons'>
                            <button onClick={() => setDeleteModal(false)}>Cancel</button>
                            <DeleteComment comment={comment} setDeleteModal={setDeleteModal} setShowButtons={setShowButtons} />
                        </div>
                    </div>

                </Modal>
            )}
            <button onClick={() => setEditModal(true)}>Edit</button>
            {showEditModal && (
                <Modal onClose={() => {
                    setEditModal(false)
                }}>
                    <div id="edit-comment-modal">
                        <div id='head'>
                            <button id="cancel" onClick={() => setShowButtons(false)}>Cancel</button>
                            <span>Edit Comment</span>
                            <div id="empty"></div>
                        </div>
                        <div className='create-comment-container'>
                            <EditComment comment={comment} setEditModal={setEditModal} setShowButtons={setShowButtons}/>
                        </div>
                    </div>
                </Modal>
            )}


            <button onClick={() => setShowButtons(false)}>Cancel</button>
        </div>
        )
}
