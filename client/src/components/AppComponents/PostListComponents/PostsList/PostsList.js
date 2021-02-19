import React, {useEffect, useState} from 'react';
import Post from "../PostComponents/Post/Post";
import {useDispatch, useSelector} from "react-redux";
import * as postsActions from '../../../../store/posts/actions';
import {getUserInfo} from "../../../../store/user/selectors";
import {getPosts} from "../../../../store/posts/selectors";
import {useHttp} from "../../../../hooks/http.hook";
import {setAllPosts, toggleLoadingLike} from "../../../../store/posts/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import {CircularProgress} from "@material-ui/core";

const PostsList = () => {

    const serverPosts = useSelector(getPosts);

    const dispatch = useDispatch();

    const user = useSelector(getUserInfo);

    const [isAllPosts, setIsAllPosts] = useState(false);


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

    const loadPosts = async () => {
        const res = await request('/posts/all', 'post', {login: user.login, length: serverPosts.length + 3});
        dispatch(setAllPosts(res.posts, user.login));
        if (res.isAllPosts) {
            setIsAllPosts(true)
        }
    }


    useEffect(() => {
        document.addEventListener('dblclick', toggleLikePost);
        return () => {
            document.removeEventListener('dblclick', toggleLikePost);
        }
    }, [])

    return (
        <InfiniteScroll
            next={loadPosts} hasMore={!isAllPosts}
            loader={<CircularProgress style={{margin: '1rem auto', display: 'block'}} color="primary"/>}
            dataLength={serverPosts.length}
            endMessage={
                <p style={{textAlign: 'center'}}>
                    <b>На этом все!</b>
                </p>
            }
        >
            {
                serverPosts.map(item => <Post info={{
                    isLiked: !!item.isLiked,
                    likes: item.likes,
                    comments: item.comments,
                    id: item._id,
                    avatar: item.avatar,
                    imgSrc: item.imageSrc,
                    ownerLogin: item.ownerLogin
                }}
                                              key={item._id}/>)
            }
            {
                !serverPosts.length && <div style={{
                    fontSize: '2rem',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    marginTop: '5rem'
                }}>Публикаций пока что нету</div>
            }
        </InfiniteScroll>
    );
};

export default PostsList;