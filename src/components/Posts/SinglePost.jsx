import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import './singlePost.scss';

const SinglePost = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

  }, [id]);

  return (
    <div className='container'>
      <div className='post'>
        {post ? (
          <div className='post-content'>
            <h1>{post.title}</h1>
            <p className='post-body'>{post.body}</p>
            <div className='comments'>
                <h3>All Comments</h3>
              {comments?.map((comment) => (
                <Comment
                  key={comment.id}
                  name={comment.name}
                  body={comment.body}
                  email={comment.email}
                />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
