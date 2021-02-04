import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";

const Posts = (props) => {
    const {serverPosts = [{id: 1, liked: true}, {id: 2, liked: false}]} = props;

    const [posts, setPosts] = useState(serverPosts);

    const toggleLikePost = e => {
        const targetData = e.target.dataset;
        if (targetData.type === 'post' && targetData.info){
            const likedPost = posts.find(item => +item.id === +targetData.info);
            likedPost.liked = !likedPost.liked;
            console.log(posts[0]);
            setPosts(prevState => [...prevState]);

        }
    }


    useEffect(() => {
        document.addEventListener('dblclick', toggleLikePost);
        return () => {
            document.removeEventListener('dblclick', toggleLikePost);
        }
    }, [])
    return (
        <div>
            {
                posts.map((item, index) => <Post liked={item.liked} id={item.id} key={index}/>)
            }
        </div>
    );
};

export default Posts;