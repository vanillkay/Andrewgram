import React from 'react';

const ProfilePost = (props) => {

    const {open, imgSrc, info} = props;

    return (
        <div onClick={() => open({imgSrc})}>
            <img style={{width: '100%', height: 'auto'}} src={"/" + imgSrc}/>
        </div>
    );
};

export default ProfilePost;