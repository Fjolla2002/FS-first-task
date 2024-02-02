import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({ body, name, email }) => {
  return (
    <div className='comment'>
      <span className='comment-name'>{name}</span>
      <Link to={`mailto:${email}`} className='comment-email'>
        {email}
      </Link>
      <p className='comment-body'>{body}</p>
    </div>
  );
};

export default Comment;