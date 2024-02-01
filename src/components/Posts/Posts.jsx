import React, { useState, useEffect }from 'react';
import axios from 'axios';
import './posts.scss';

const Posts = () => {
    const [posts, setPosts] = useState();
    const [comments, setComments] = useState();

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>{
            setPosts(res.data)
            console.log(res.data);
        })
        .catch((error) => {
            console.log("error", error)
        })
        axios.get('https://jsonplaceholder.typicode.com/comments')
        .then((res)=>{
            setComments(res.data)
            console.log(res.data);
        })
        .catch((error) => {
            console.log("error", error)
        })
    }, [])


  return (
    <div>
        <h2>Recent Posts</h2>
        <div className='all-posts'>
            {posts?.slice(0, 10).map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>

                    <div>
                        {comments?.filter((comment) => comment.postId === post.id).map((postComment) => (
                            <div key={postComment.id}>
                                <span>{postComment.name}</span>
                                <span>{postComment.email}</span>
                                <p>{postComment.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Posts