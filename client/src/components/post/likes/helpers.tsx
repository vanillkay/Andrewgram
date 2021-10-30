import React from 'react';
import { Link } from 'react-router-dom';

import { PostLikes } from 'types/post';

export const mapLikes = (likes: Array<PostLikes>) =>
  likes.map((item, index) => (
    <Link
      style={{
        textDecoration: 'none',
        marginTop: '1rem',
        display: 'block',
        fontWeight: 'bold',
        color: 'inherit',
      }}
      key={index}
      to={`/profile/${item.owner}`}
    >
      {item.owner}
    </Link>
  ));
