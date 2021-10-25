export const getPosts = ({ posts }) => posts.posts;
export const getAllPostsLoading = ({ posts }) => posts.isLoadingAllPosts;
export const getUserPosts = ({ posts }) => posts.userPosts;
export const getUserPostsLoaded = ({ posts }) => posts.isLoadedUserPosts;
export const getPostLikeLoading = ({ posts }) => posts.isLikedPost;
export const getPostCommentLoading = ({ posts }) => posts.isCommentPost;
