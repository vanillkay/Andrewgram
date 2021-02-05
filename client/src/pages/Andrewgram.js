import React from 'react';
import PostsList from "../components/AppComponents/PostListComponents/PostsList/PostsList";
import {makeStyles} from "@material-ui/core/styles";
import ProfileInfo from "../components/AppComponents/ProfileInfoComponents/ProfileInfo/ProfileInfo";

const useStyles = makeStyles(theme => ({
    'main': {
        width: '100%',
        height: 'auto',
        minHeight: '97vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: "center",
        alignItems: 'center',
        paddingTop: '4rem'
    },
    'main__posts': {
        width: '100%'
    },
    'main__profile-info': {
        width: '100%',
        border: '3px solid black',
    },
    '@media (min-width: 600px)': {
        main: {
            flexDirection: 'row',
            alignItems: 'flex-start'
        },
        'main__posts': {
            width: '40%',
            maxWidth: '700px',
        },
        'main__profile-info':{
            width: '20%'
        }
    }
}))

const Andrewgram = () => {

    const classes = useStyles();
    return (
        <div className={classes.main}>
            <div className={classes['main__posts']}>
                <PostsList/>
            </div>
            <div className={classes['main__profile-info']}>
                <ProfileInfo/>
            </div>

        </div>
    );
};

export default Andrewgram;