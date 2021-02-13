import React from 'react';
import {Skeleton} from "@material-ui/lab";

const ProfilePost = (props) => {

    const {isLoading = false, open, imgSrc, info, comments, ownerLogin, likes} = props;

    return (
        <>
            {
                isLoading ?
                    <div>
                        <Skeleton animation="wave" variant="rect" style={{width: '10rem', height: '10rem'}}/>
                    </div>
                    :
                    <div onClick={() => open({imgSrc, comments, text: info, ownerLogin, likes})}>
                        <img style={{width: '100%', height: 'auto'}} src={"/" + imgSrc}/>
                    </div>
            }
        </>
    );
};

export default ProfilePost;