import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { followUserThunk, unfollowUserThunk } from "../../store/users"
import CreateChatroom from "../Chat/CreateChatroom";



export default function Follow({user}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const [following, setFollowing] = useState(false)
    
    let currentUser = Object.values(users).filter(user => user.id === sessionUser.id)

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(user.followers.includes(currentUser[0].id)){
            await dispatch(unfollowUserThunk(user))
            setFollowing(false)
        }else {
            await dispatch(followUserThunk(user))
            setFollowing(true)
        }
    }

    if(!currentUser) return null;
    return (
        <>
        {user.followers.includes(currentUser[0].id) ? 
            <>
                <form onSubmit={handleSubmit}>
                    <button>Unfollow</button>
                </form>
                <CreateChatroom user={user} />
            </>
            :
            <form onSubmit={handleSubmit}>
                <button>Follow</button>
            </form>
        }
        </>
    )
}