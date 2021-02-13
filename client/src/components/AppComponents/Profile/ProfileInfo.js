import React from 'react';
import ProfileRef from "./ProfileRef/ProfileRef";
import {useSelector} from "react-redux";
import {getUserInfo} from "../../../store/user/selectors";
import {useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    'profile-info': {
        paddingLeft: '10rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    'profile-loading': {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
}))

const ProfileInfo = (props) => {

    const {isLoading} = props;

    const user = useSelector(getUserInfo);

    const {login} = useParams();

    const isOwn = login === user.login;

    const classes = useStyles()


    return (
        <div className={classes['profile-info']}>
            {!isLoading && (isOwn ? <ProfileRef login={user.login} isPageComp isOwn={true}/> : <ProfileRef  isPageComp login={user.login}/>)}
            {isLoading &&
            <div className={classes['profile-loading']}>
                <Skeleton animation={'wave'} variant="circle" height={'5rem'} width={'5rem'}/>
                <Skeleton animation={'wave'} variant="text" height={'4vh'} width={'30%'} style={{marginLeft: '2rem'}}/>
            </div>}
        </div>
    );
};

export default ProfileInfo;