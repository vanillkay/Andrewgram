import React, {useEffect} from 'react';
import ProfileInfo from "../components/AppComponents/Profile/ProfileInfo";
import ProfilePostsGrid from "../components/AppComponents/Profile/ProfilePostsGrid";
import {makeStyles} from "@material-ui/core/styles";
import NewPost from "../components/AppComponents/Profile/NewPost";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../hooks/http.hook";
import {setUserPosts} from "../store/posts/actions";
import {useParams} from "react-router-dom";
import {getUserInfo} from "../store/user/selectors";
import {getRecommended, getSubscriptions} from "../store/subscribers/selectors";

const useStyles = makeStyles(theme => ({
    'profile-page': {
        padding: '4rem 2rem 0',
        margin: '0 auto'
    }
}))

const ProfilePage = () => {

    const classes = useStyles();

    const {request, loading} = useHttp()


    const {login} = useParams();


    const dispatch = useDispatch();

    const user = useSelector(getUserInfo);

    const visitedUser = [...useSelector(getRecommended), ...useSelector(getSubscriptions)].filter(item => item.login === login)[0]

    const isOwn = login === user.login;


useEffect(() => {
    if (!isOwn){
        dispatch(setUserPosts([]));
    }
    request('/posts/users', 'post', {login})
        .then(res => dispatch(setUserPosts(res, user.login)));
}, [login])





    return (
        <div className={classes['profile-page']}>
            <ProfileInfo user={isOwn ? user : visitedUser} isOwn={isOwn} isLoading={loading}/>
            {isOwn && <NewPost isLoading={loading}/>}
            <ProfilePostsGrid user={isOwn ? user : visitedUser} isLoading={loading}/>
        </div>
    );
};

export default ProfilePage;