import React from 'react';

const ProfilePost = (props) => {

    const {open} = props;

    return (
        <div onClick={open}>
            <img style={{width: '100%', height: 'auto'}} src={'https://cnet2.cbsistatic.com/img/-e95qclc6pwSnGE2YccC2oLDW_8=/1200x675/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg'}/>
        </div>
    );
};

export default ProfilePost;