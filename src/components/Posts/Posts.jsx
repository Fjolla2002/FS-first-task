import React, { useState, useEffect }from 'react';
import axios from 'axios';
import './posts.scss';
import {NavLink} from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState();
    const [comments, setComments] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>{
            setPosts(res.data)
            console.log(res.data);
        })
        .catch((error) => {
            console.log("error", error)
        });

        axios.get('https://jsonplaceholder.typicode.com/comments')
        .then((res)=>{
            setComments(res.data)
            console.log(res.data);
        })
        .catch((error) => {
            console.log("error", error)
        });

        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res)=>{
            setUsers(res.data)
            console.log(res.data);
        })
        .catch((error) => {
            console.log("error", error)
        });
    }, [])


  return (
    <div className='container'>
        <h2 className='title'>Recent Posts</h2>
        <div className='all-posts'>
            {posts?.slice(5, 15).map((post) => (
                <div className='single-post' key={post.id}>
                    <div className='post-owner'>
                        {users?.filter((user) => user.id === post.userId).map((user) => (
                            <span key={user.id}>By <span className='username'>{user.name}</span></span>
                        ))}
                    </div>
                    <div className='post-details'>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                    <div className='post-link'>
                        <NavLink>
                            Read More
                        </NavLink>
                    </div>
                    {/* <div className='comments'>
                        <h5>Comments</h5>
                        {comments?.filter((comment) => comment.postId === post.id).map((postComment) => (
                            <div className='single-comment' key={postComment.id}>
                                <span>{postComment.name}</span>
                                <span>{postComment.email}</span>
                                <p>{postComment.body}</p>
                            </div>
                        ))}
                    </div> */}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Posts