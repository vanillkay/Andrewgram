import React, {useEffect} from 'react';
import PostsList from "../components/AppComponents/PostListComponents/PostsList/PostsList";
import {makeStyles} from "@material-ui/core/styles";
import SideProfileInfo from "../components/AppComponents/SideProfileInfoComponents/SideProfileInfo/SideProfileInfo";
import Loader from "../components/Loaders/Loader";
import {useSelector} from "react-redux";
import {getAllPostsLoading} from "../store/posts/selectors";
import {useHttp} from "../hooks/http.hook";
import {getUserInfo} from "../store/user/selectors";

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
        'main__profile-info': {
            width: '20%',
            marginLeft: '2rem',
            position: 'sticky',
            top: 'calc(4rem + 10px)',
            minWidth: '300px'

        }
    }
}))

const Andrewgram = () => {

    const classes = useStyles();

    const {request} = useHttp();

    const isLoadingInfo = !useSelector(getAllPostsLoading);

    const user = useSelector(getUserInfo)

    // useEffect(() => {
    //     request('/posts/all', 'post', {login: user.login})
    //         .then(res => console.log(res))
    // }, [])

    return (
        <>
            {isLoadingInfo ? <Loader/> : <div className={classes.main}>
                <div className={classes['main__posts']}>
                    <PostsList/>
                </div>
                <div className={classes['main__profile-info']}>
                    <SideProfileInfo/>
                </div>
            </div>}
        </>

    );
};

export default Andrewgram;