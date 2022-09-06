import { useDispatch } from "react-redux"
import { useState } from "react"
import { editUserThunk } from "../../store/users"


export default function EditProfile({user, setEditModal}) {
  const dispatch = useDispatch()
  const [profile_pic, setProfilePic] = useState()


    const updateImgUrl = (e) => {
        const img = e.target.files[0]
        setProfilePic(img)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
      // if(user) {
        const editedUser = {
          id: user.id,
          full_name: user.full_name,
          email: user.email, 
          username: user.username,
          profile_pic,
        }

       let edit =  await dispatch(editUserThunk(editedUser))
        setEditModal(false)
    }

    return (
        <form onSubmit={handleSubmit} >
                <input
                type="file"
                accept="image/*"
                onChange={updateImgUrl}
                />
            <button>Update Image</button>
        </form>
    )
}