import React, {useEffect} from 'react';
import Post from "../PostComponents/Post/Post";
import {useDispatch, useSelector} from "react-redux";
import * as postsActions from '../../../../store/posts/actions';
import {getUserInfo} from "../../../../store/user/selectors";
import {loadSubsPosts} from "../../../../store/posts/operations";
import {getPosts} from "../../../../store/posts/selectors";

const PostsList = () => {

    const serverPosts = useSelector(getPosts);

    const dispatch = useDispatch();

    const userInfo = useSelector(getUserInfo)

    const toggleLikePost = e => {
        const targetData = e.target.dataset;
        if (targetData.type === 'post' && targetData.info) {
            dispatch(postsActions.toggleLike(targetData.info, userInfo.login))
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
                    isLiked: item.isLiked,
                    likes: item.likesAmount,
                    serverComments: item.serverComments,
                    id: item.id
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