// import React, {useEffect} from "react"
// import {useDispatch, useSelector} from 'react-redux'
// import { getPostsThunk } from "../../store/posts"
// // import classes from './Explore.module.css'
// import './Explore.css'
// import ExploreComments from "./ExploreComments"


// export default function Explore(){
//     const dispatch = useDispatch()
//     const posts = useSelector(state => state.posts)
//     // const [showCommentModal, setCommentModal] = useState(false)


//     let postsArr;
    
//     if(posts){
//         postsArr = Object.values(posts)
//     }

//     // let result;

//     // if(postsArr) {
//     //     let len = postsArr.length / 6
//     //     console.log("length", len)
//     //     const postsPerGroup = Math.ceil(postsArr.length / 5)
//     //     result = new Array(postsPerGroup).fill('').map((_, i) => postsArr.slice(i * 5, (i + 1) * 6));
//     // }

//     // console.log(result, "result")

//     // const handleIndex = (index) => {
//     //     if(index <= 9 ) return index;
//     //     if(index > 9) {
//     //         index = index % 10
//     //     }
//     //     return index;
//     // }
    
//     useEffect(()=> {
//         dispatch(getPostsThunk())
//     }, [dispatch])


//     return (
//         // <div className={classes.imgContainer}>
//         <div className="imgContainer">
//             {postsArr && postsArr.slice(0).reverse().map((post) => (
//                 // <div className={classes.wrapper}>
//                 <div key={post.id} className="wrapper">
//                     <img src={post.img_url} alt="post" />
//                     {/* <div className={classes.overlay}></div> */}
//                     {/* <div onClick={() => setCommentModal(true)} className="overlay"> */}
//                         <ExploreComments post={post}/>
//                     {/* </div> */}
//                 </div>

//             ))}
//         </div>
//     )
// }