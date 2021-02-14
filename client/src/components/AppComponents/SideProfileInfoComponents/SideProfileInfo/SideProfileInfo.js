import React from 'react';
import ProfileRef from "../../Profile/ProfileRef/ProfileRef";
import SubscribeSection from "../SubscribeSection/SubscribeSection";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {getUserInfo} from "../../../../store/user/selectors";

const useStyles = makeStyles(() => ({
    'profile-info':{
        padding: '.5rem'
    }
}))
const SideProfileInfo = () => {

    const user = useSelector(getUserInfo);

    const classes = useStyles();
    return (
        <div className={classes['profile-info']}>
            <ProfileRef isOwn avatar={user.avatar} login={user.login}/>
            <SubscribeSection/>
        </div>
    );
};

export default SideProfileInfo;