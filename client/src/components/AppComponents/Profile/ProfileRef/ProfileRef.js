import React from 'react';
import {Avatar, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {toggleSubs} from "../../../../store/subscribers/actions";
import {Link} from "react-router-dom";

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
        justifySelf: 'flex-start',
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
        '&:hover':{
            background: 'none'
        }
    }
}))

const ProfileRef = (props) => {

    const {
        type,
        isOwn,
        avatarClass,
        avatar = 'https://cnet2.cbsistatic.com/img/-e95qclc6pwSnGE2YccC2oLDW_8=/1200x675/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg',
        login = 'Andrew'
    } = props;

    const dispatch = useDispatch();

    const toggleSubsBtn = () => {
        dispatch(toggleSubs({login, type}))
    }
    const btnText = type === 'subscription' ? 'Отписаться' : 'Подписаться'

    const classes = useStyles({type});
    return (
        <div className={classes.profile}>
            <Link to={'profile/' + login} className={classes['profile__info']}>
                <Avatar alt="Remy Sharp" className={avatarClass || classes['profile__avatar']} src={avatar}/>
                <div className={classes['profile__name']}>{login}</div>
            </Link>
            {!isOwn &&
            <>
                <Button disableRipple onClick={toggleSubsBtn} className={classes['profile__sbsc-btn']}>{btnText}</Button>
            </>
            }
        </div>
    );
};

export default ProfileRef;