import React, {useEffect, useState} from 'react';
import ProfileInfo from "../components/AppComponents/Profile/ProfileInfo";
import ProfilePostsGrid from "../components/AppComponents/Profile/ProfilePostsGrid";
import {makeStyles} from "@material-ui/core/styles";
import NewPost from "../components/AppComponents/Profile/NewPost";
import {useDispatch, useSelector} from "react-redux";
import {getUserPostsLoaded} from "../store/posts/selectors";
import {useHttp} from "../hooks/http.hook";
import {getUserInfo} from "../store/user/selectors";
import {setUserPost} from "../store/posts/actions";

const useStyles = makeStyles(theme => ({
    'profile-page': {
        padding: '4rem 2rem 0',
        margin: '0 auto'
    }
}))

const ProfilePage = () => {

    const classes = useStyles();

    const {request, loading} = useHttp()

    const isLoaded = !useSelector(getUserPostsLoaded);

    const user = useSelector(getUserInfo);

    const dispatch = useDispatch();

useEffect(() => {
    request('/posts/users', 'post', {login: user.login})
        .then(res => dispatch(setUserPost(res)));
}, [])




    return (
        <div className={classes['profile-page']}>
            <ProfileInfo isLoading={isLoaded}/>
            <NewPost isLoading={isLoaded}/>
            <ProfilePostsGrid isLoading={isLoaded}/>
        </div>
    );
};

export default ProfilePage;