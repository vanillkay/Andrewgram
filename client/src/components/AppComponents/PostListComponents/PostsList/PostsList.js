import React, {useEffect} from 'react';
import Post from "../PostComponents/Post/Post";
import {useDispatch, useSelector} from "react-redux";
import * as postsActions from '../../../../store/posts/actions';
import {getUserInfo} from "../../../../store/user/selectors";
import {getPosts} from "../../../../store/posts/selectors";
import {useHttp} from "../../../../hooks/http.hook";
import {toggleLoadingLike} from "../../../../store/posts/actions";

const PostsList = () => {

    const serverPosts = useSelector(getPosts);

    const dispatch = useDispatch();

    const user = useSelector(getUserInfo);


    const {request} = useHttp();


    const toggleLikePost = e => {
        const targetData = e.target.dataset;
        if (targetData.type === 'post' && targetData.info) {
            dispatch(toggleLoadingLike());
            request('/post/like', 'post', {id: targetData.info, likerLogin: user.login})
                .then(res => {
                    dispatch(postsActions.toggleLike(targetData.info, user.login));
                })
                .finally(() => dispatch(toggleLoadingLike()))
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
                serverPosts.map((item, index) => <Post info={{
                    isLiked: !!item.isLiked,
                    likes: item.likes,
                    comments: item.comments,
                    id: item._id,
                    avatar: item.avatar,
                    imgSrc: item.imageSrc,
                    ownerLogin: item.ownerLogin
                }}
                                                       key={index}/>)
            }
            {
                !serverPosts.length && <div style={{
                    fontSize: '2rem',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    marginTop: '5rem'
                }}>постов пока что нету</div>
            }

        </div>
    );
};

export default PostsList;