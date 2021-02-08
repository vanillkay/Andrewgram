import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ProfileRef from "../../Profile/ProfileRef/ProfileRef";


const useStyles = makeStyles((theme, info) => ({
    'subscribe-section': {
        marginTop: info => info.type === 'recommended' ? '2rem' : 0,
        border: '1px solid rgb(219, 219, 219)',
        backgroundColor: '2px solid black',
        borderRadius: '3px',
        padding: '1rem 0 1rem 1rem',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    'subscribe-section__list': {
        marginTop: '1rem',
        overflowX: 'hidden',
        maxHeight: '200px',
        fontSize: '1rem',
        '& div': {
            marginBottom: '.5rem'
        }
    },
    'subscribe-section__no-subs-text': {
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '1rem 1rem 0 0'
    },
    'subscribe-section__profile': {
        width: '3rem',
        height: '3rem',
    }
}))

const Subscribes = (props = []) => {

    const {type, subscribers = []} = props;

    const classes = useStyles({type});


    return (
        <div className={classes['subscribe-section']}>
            <span>{type === 'subscription' ? 'Подписки' : 'Рекомендации для вас'}</span>
            <div className={classes['subscribe-section__list']}>
                {subscribers.map((item, index) =>
                    <ProfileRef key={index}
                                type={type}
                                avatarClass={classes['subscribe-section__profile']}
                                login={item.login}/>)}
                {!subscribers.length && <div
                    className={classes['subscribe-section__no-subs-text']}>{type === 'subscription' ? 'Подписок пока нет' : 'Рекомендаций пока нету'}
                </div>}
            < /div>
        </div>
    );
};

export default Subscribes;