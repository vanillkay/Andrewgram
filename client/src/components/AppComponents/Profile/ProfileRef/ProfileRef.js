import React from 'react';
import {Avatar, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {toggleSubs} from "../../../../store/subscribers/actions";
import {Link, useHistory} from "react-router-dom";
import {useHttp} from "../../../../hooks/http.hook";
import {logoutUser} from "../../../../store/user/actions";

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
    'profile__logout-btn':{
        width: '5rem',
        height: '2rem'
    }
}))

const ProfileRef = (props) => {

    const {
        type,
        isOwn,
        avatarClass,
        isPageComp = false,
        avatar = 'https://cnet2.cbsistatic.com/img/-e95qclc6pwSnGE2YccC2oLDW_8=/1200x675/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg',
        login = 'Andrew'
    } = props;

    const dispatch = useDispatch();

    const {request, loading} = useHttp();

    const toggleSubsBtn = () => {
        dispatch(toggleSubs({login, type}))
    }
    const btnText = type === 'subscription' ? 'Отписаться' : 'Подписаться';

    const logout = () => {
        request('/auth/logout')
            .then(res => {
                if (res.success){
                    dispatch(logoutUser());
                }
            })

    }

    const classes = useStyles({type, isOwn});
    return (
        <div className={classes.profile}>
            {isPageComp ?
                <div className={classes['profile__info']}>
                    <Avatar alt="Remy Sharp" className={avatarClass || classes['profile__avatar']} src={avatar}/>
                    <div className={classes['profile__name']}>{login}</div>
                </div> :
                <Link to={'profile/' + login} className={classes['profile__info']}>
                    <Avatar alt="Remy Sharp" className={avatarClass || classes['profile__avatar']} src={avatar}/>
                    <div className={classes['profile__name']}>{login}</div>
                </Link>}
            {isOwn ?  <Button variant={"contained"}
                              color={"primary"}
                              onClick={logout}
                              disabled={loading}
                              className={classes['profile__logout-btn']}>Выйти</Button>:
                <Button disableRipple onClick={toggleSubsBtn}
                        className={classes['profile__sbsc-btn']}>{btnText}</Button>
            }

        </div>
    );
};

export default ProfileRef;