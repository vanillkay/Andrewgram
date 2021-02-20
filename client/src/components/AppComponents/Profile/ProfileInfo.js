import React from 'react';
import ProfileRef from "./ProfileRef/ProfileRef";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";
import {getLoading, getRecommended} from "../../../store/subscribers/selectors";

const useStyles = makeStyles(theme => ({
    'profile-info': {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    'profile-loading': {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        "& span:last-of-type": {
            marginTop: '1rem'
        }
    },
    '@media (min-width: 600px)': {
        'profile-info': {
            paddingLeft: '10rem',
            flexDirection: 'column',
        },
        'profile-loading': {
            flexDirection: 'row',
            "& span:last-of-type": {
                marginTop: 0
            }
        }
    }
}))

const ProfileInfo = (props) => {

    const {isLoading, isOwn} = props;


    const {user} = props;


    const classes = useStyles();

    const recommended = useSelector(getRecommended);

    const isLoadingSubs = useSelector(getLoading)

    const userProfType = recommended.find(item => item.login === user.login) ? 'recommended' : 'subscription';


    return (
        <div className={classes['profile-info']}>
            {!isLoading && <ProfileRef type={isOwn ? '' : userProfType} isLoading={isLoadingSubs} login={user.login}
                                       avatar={user.avatar || ''} isPageComp isOwn={isOwn}/>}
            {isLoading &&
            <div className={classes['profile-loading']}>
                <Skeleton animation={'wave'} variant="circle" height={'5rem'} width={'5rem'}/>
                <Skeleton animation={'wave'} variant="text" height={'4vh'} width={'80%'}/>
            </div>}
        </div>
    );
};

export default ProfileInfo;