import React, {useState} from 'react';
import {Avatar, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {toggleLoading, toggleSubs} from "../../../../store/subscribers/actions";
import {Link, useHistory} from "react-router-dom";
import {useHttp} from "../../../../hooks/http.hook";
import {logoutUser} from "../../../../store/user/actions";
import NewAvatar from "../NewAvatar";
import {getUserInfo} from "../../../../store/user/selectors";
import {getRecommended} from "../../../../store/subscribers/selectors";

const useStyles = makeStyles(theme => ({
    'profile': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    'profile__info': {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit'
    },
    'profile__avatar': {
        width: '4rem',
        height: '4rem',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    'profile__name': {
        marginLeft: '1rem',
        fontWeight: 'bold',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    'profile__sbsc-btn': {
        fontSize: '.8rem',
        margin: '0 1rem .2rem 0',
        textTransform: 'none',
        color: props => props.type === 'subscription' ? '' : theme.colors.main,
        '&:hover': {
            background: 'none'
        }
    },
    'profile__logout-btn': {
        minWidth: '5rem',
        minHeight: '2rem'
    }
}))

const ProfileRef = (props) => {

    const {
        type,
        isOwn,
        avatarClass,
        isLoading,
        isPageComp = false,
        avatar = '',
        login = 'andrew'
    } = props;

    const dispatch = useDispatch();


    const {request, loading} = useHttp();
    const [isNewAvatar, setNewAvatar] = useState(false);

    const user = useSelector(getUserInfo);


    const toggleSubsBtn = () => {
        dispatch(toggleLoading());
        request('/user/subs', 'post', {login, avatar: avatar, type, userLogin: user.login})
            .then(res => {
                if (res.success) {
                    dispatch(toggleSubs({login, type}))
                }
            }).finally(() => {
            dispatch(toggleLoading());
        });

    }

    const btnText = type === 'subscription' ? 'Отписаться' : 'Подписаться';

    const logout = () => {
        request('/auth/logout')
            .then(res => {
                if (res.success) {
                    dispatch(logoutUser());
                }
            })
    }

    const classes = useStyles({type, isOwn});

    return (
        <div className={classes.profile}>
            {isPageComp ?
                <>
                    <div className={classes['profile__info']}>
                        <Avatar className={avatarClass || classes['profile__avatar']} src={'/' + avatar}/>
                        <div className={classes['profile__name']}>{login}</div>
                    </div>
                    {isOwn && <Button variant={"contained"}
                                      color={"primary"}
                                      onClick={() => setNewAvatar(true)}
                                      disabled={loading}
                                      className={classes['profile__logout-btn']}>Изменить аватар</Button>}</> :
                <Link to={'profile/' + login} className={classes['profile__info']}>
                    <Avatar alt="Avatar" className={avatarClass || classes['profile__avatar']} src={avatar}/>
                    <div className={classes['profile__name']}>{login}</div>
                </Link>}
            {isOwn ? <Button variant={"contained"}
                             color={"primary"}
                             onClick={logout}
                             disabled={loading}
                             className={classes['profile__logout-btn']}>Выйти</Button> :
                <Button disableRipple disabled={isLoading} onClick={toggleSubsBtn}
                        className={classes['profile__sbsc-btn']}>{btnText}</Button>
            }
            {isNewAvatar && <NewAvatar login={login} open={setNewAvatar}/>}

        </div>
    );
};

export default ProfileRef;