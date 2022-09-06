import CreatePost from "../Posts/CreatePost"
import { Modal } from "../Context/Modal"
import './ModalCss/CreatePostModal.css'
export default function CreatePostModal({setCreateModal}) {

    return (
        <Modal onClose={() => {
            setCreateModal(false)
        }}>
            <div id="create-post-header">
                <button onClick={() => setCreateModal(false)}>Cancel</button>
                <p>Create new post</p>
            </div>
            <div id="create-post-container">
                <CreatePost setCreateModal={setCreateModal} />
            </div>
        </Modal>
    )
}
