import React from 'react';
import ProfileRef from "./ProfileRef/ProfileRef";
import {useSelector} from "react-redux";
import {getUserInfo} from "../../../store/user/selectors";
import {useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    'profile-info': {
        paddingLeft: '10rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
}))

const ProfileInfo = () => {

    const user = useSelector(getUserInfo);

    const {login} = useParams();

    const isOwn = login === user.login;

    const classes = useStyles()


    return (
        <div className={classes['profile-info']}>
            <div>
                {isOwn ? <ProfileRef login={user.login} isOwn={true}/> : <ProfileRef login={user.login}/>}
            </div>
        </div>
    );
};

export default ProfileInfo;