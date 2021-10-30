import { PostComment } from 'types/post';
import { Link } from 'react-router-dom';

export const mapComments = (comments: Array<PostComment>, className: string) =>
  comments.slice(1).map((item) => (
    <p key={item._id} className={className}>
      <Link to={'/profile/' + item.owner}>{item.owner}</Link>
      <span>{item.text}</span>
    </p>
  ));
