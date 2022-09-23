import { useDispatch } from "react-redux"
import { useState } from "react"
import { editUserThunk } from "../../store/session"


export default function EditProfile({user, setEditModal, setUpdate}) {
  const dispatch = useDispatch()
  const [profile_pic, setProfilePic] = useState()

  console.log(user, "user in edit profile")
    const updateImgUrl = (e) => {
        const img = e.target.files[0]
        setProfilePic(img)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(user, "user in ediit")
      // if(user) {
        const editedUser = {
          id: user.id,
          full_name: user.full_name,
          email: user.email, 
          username: user.username,
          profile_pic,
        }

       let edit =  await dispatch(editUserThunk(editedUser))
        setUpdate(false)
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