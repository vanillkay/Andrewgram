import React, {useEffect} from 'react';
import Post from "../PostComponents/Post/Post";
import {useDispatch, useSelector} from "react-redux";
import * as postsSelector from "../../../../store/posts/selectors";
import * as postsActions from '../../../../store/posts/actions';

const PostsList = () => {

    const serverPosts = useSelector(postsSelector.getPosts);

    const dispatch = useDispatch();

    const toggleLikePost = e => {
        const targetData = e.target.dataset;
        if (targetData.type === 'post' && targetData.info) {
            dispatch(postsActions.toggleLike(targetData.info, 'nekit'))
        }
    }


    useEffect(() => {
        document.addEventListener('dblclick', toggleLikePost);
        return () => {
            document.removeEventListener('dblclick', toggleLikePost);
        }
    }, [])
    return (
        <div>
            {
                serverPosts.map((item, index) => <Post isLiked={item.isLiked} likes={item.likesAmount} serverComments={item.comments} id={item.id}
                                                       key={index}/>)
            }
        </div>
    );
};

export default PostsList;