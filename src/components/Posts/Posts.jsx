import React, { useState, useEffect }from 'react';
import axios from 'axios';
import './posts.scss';
import {NavLink} from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState();
    const [users, setUsers] = useState();
    const [showedPosts, setShowedPosts] = useState(20);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>{
            setPosts(res.data)
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

    const handleLoadMore = () => {
        if(showedPosts < posts.length){
            setShowedPosts(showedPosts + 6);
        }
    }


  return (
    <div className='container'>
        <h2 className='title'>Recent Posts</h2>
        <div className='all-posts'>
            {posts?.slice(0, showedPosts).map((post) => (
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
                        <NavLink to={`/post/${post.id}`}>
                            Read More
                        </NavLink>
                    </div>
                </div>
            ))}
        </div>
        {showedPosts < posts?.length &&
            <button onClick={() => handleLoadMore()} className='btn'>
                Load More
            </button>
        }
    </div>
  )
}

export default Posts