import React from 'react';
import ProfileInfo from "../components/AppComponents/Profile/ProfileInfo";
import ProfilePostsGrid from "../components/AppComponents/Profile/ProfilePostsGrid";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import NewPost from "../components/AppComponents/Profile/NewPost";

const useStyles = makeStyles(theme => ({
    'profile-page': {
        padding: '4rem 2rem 0',
        margin: '0 auto'
    }
}))

const ProfilePage = () => {

    const classes = useStyles();


    return (
        <div className={classes['profile-page']}>
            <ProfileInfo />
            <NewPost/>
            <ProfilePostsGrid/>
        </div>
    );
};

export default ProfilePage;