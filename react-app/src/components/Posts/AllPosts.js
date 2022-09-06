import React, {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { NavLink } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import AllComments from "../Comments/AllComments"
import CreateComment from "../Comments/CreateComment"
import PostOwner from "./PostOwner"
import Likes from "../Likes/Likes"
import './Posts.css'

function AllPosts(){
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)

    let postsArr;
    
    if(posts){
       postsArr = Object.values(posts)
    }

    useEffect(()=> {
        dispatch(getPostsThunk())
    }, [dispatch])




    if(!posts) return null
    return (
        <div className="post-container">
            {postsArr && postsArr.slice(0).reverse().map(post => (
                <div className="post-wrapper" key={post.id}>
                    <PostOwner post={post}/>
                    <div className="post"> 
                        <img src={post.img_url} alt="delicious platter" />
                    </div>
                    <div className="svg-container"> 
                        <Likes post={post} />
                        <AllComments post={post} isSvg={true} isOverlay={false} postId={post.id}/>
                    </div>
                    {post.caption ?
                    <div className="caption-container">
                        <NavLink to={`/user/${post.user_id}`} id='owner'>{post.owner.username}</NavLink><span id="caption">{post.caption}</span>
                        {/* <span id="owner">{post.owner.username}</span><span id="caption">{post.caption}</span> */}
                    </div>
                    :
                    null
                }

                    <div> 
                        <AllComments post={post} />
                    </div>
                    <div className="create-comment-container">
                        <CreateComment postId={post.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllPosts