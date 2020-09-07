import {
    SET_POSTS, 
    COUNT_NUMBER_OF_POSTS,
    SET_FIRST_SET_OF_POSTS,
    SET_MORE_POSTS,
    SET_POST,
    POST_A_POST, 
    COMMENT_A_POST, 
    DELETE_A_COMMENT,
    LOADING_DATA, 
    LIKE_POST, 
    UNLIKE_POST,
    LIKE_COMMENT,
    UNLIKE_COMMENT,
    CLEAR_ERRORS,
    LOADING_UI,
    DELETE_POST,
    GET_USERS,
    GET_USER,
    GET_SINGLE_USER,
    OPEN_CARD_PROFILE, 
    CLOSE_CARD_PROFILE
} from '../types';
import axios from 'axios';

//? WHAT IN HERE ? 
//? + Get all the posts for new feed [ F1 ]
//? + Get the information of the post you click on notifications [ F2 ]
//? + Infinity Scroll Actions [ F3 ]
//? + Get users information [ F4 ] 
//? + Redirect user to people profile page when he click on the name [ F5 ]
//? + Comment/ Like/ UnLike/ Delete comments [ F6 ]
//? + Post a new post [ F7 ]
//? + Like/ Unlike/ Delete/ Edit Post [ F8 ]


//! F1
export const getPosts = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        })
}
//! END OF F1


//! F2
export const getPost = (postID) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.get(`/post/${postID}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({type: CLEAR_ERRORS});
        })
        .catch(err => {
            console.log(err);
            dispatch({type: CLEAR_ERRORS});
        });
}
//! END OF F2

//! F3
export const countPosts = () => dispatch => {
    axios.get('/count')
        .then(res => {
            dispatch({
                type: COUNT_NUMBER_OF_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const getFirstSetOfPosts = () => dispatch => {
    axios.get('/firstSetPosts')
        .then(res => {
            dispatch({
                type: SET_FIRST_SET_OF_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_FIRST_SET_OF_POSTS,
                payload: []
            })
        })
}

export const getMorePosts = (last) => dispatch => {
    axios.get(`/fetchMoreData/${last}`)
    .then(res => {
        dispatch({ 
            type: SET_MORE_POSTS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({ 
            type: SET_MORE_POSTS,
            payload: []
        })
    })
}
//! END OF F3

//! F4
export const getUsers = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/users')
    .then(res => {
        dispatch({
            type:  GET_USERS,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err);
        dispatch({
            type:  GET_USERS,
            payload: []
        });
    });
}
//! END OF F4

//! F5
export const getUser = (handle) => dispatch => {
    axios.get(`/profile/${handle}`)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err)
        });
}
//! END OF F5

export const getSingleUser = (handle) => dispatch => {
    axios.get(`/users/${handle}`)
        .then(res => {
            dispatch({
                type: GET_SINGLE_USER,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
        })
}

//! F6
export const commentPost = (postID, body) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post(`/posts/${postID}/comment`, body)
        .then(res => {
            dispatch({
                type: COMMENT_A_POST,
                payload: res.data
            });
            dispatch({type: CLEAR_ERRORS});
        })
        .catch(err => {
            console.log(err);
            dispatch({type: CLEAR_ERRORS});
        })
}

export const likeComment = (commentID) => dispatch => {
    axios.get(`comment/${commentID}/like`)
        .then(res => {
            dispatch({
                type: LIKE_COMMENT,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

export const unlikeComment = (commentID) => dispatch => {
    axios.get(`comment/${commentID}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_COMMENT,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

export const deleteComment = (postID, commentID) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.delete(`post/${postID}/${commentID}/comment`)
        .then(() => {
            dispatch({
                type:  DELETE_A_COMMENT,
                payload: {postID, commentID}
            })
            dispatch({type: CLEAR_ERRORS});
        })
        .catch(err => {
            console.log(err);
            dispatch({type: CLEAR_ERRORS});
        });
}
//! END OF F6

//! F7
export const postOnePost = (newPost) => (dispatch) => {
    axios.post('/post', newPost)
        .then(res => {
            dispatch({
                type: POST_A_POST,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
}
//! END OF F7

//! F8
export const likePost = (postID) => dispatch => {
    axios.get(`post/${postID}/like`)
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}
export const unlikePost = (postID) => dispatch => {
    axios.get(`post/${postID}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

//TODO  4) Delete START
export const deletePost = (postID) => dispatch => {
    axios.delete(`post/${postID}`)
        .then(() => {
            dispatch({
                type: DELETE_POST,
                payload: postID
            });
            setTimeout(window.location.reload(),2);
        })
        .catch(err => console.log(err));
}


//TODO 5) EDIT START
export const editPostBody = (postID, body) => dispatch => {
    axios.post(`editpost/${postID}`, body)
        .then((res) => {
            dispatch({
                type: 'SET_POSTS',
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err);
        })
}
//! END OF F8


//TODO: ONGOING --> Irrelevant 
export const openCardProfile = () => dispatch => {
    dispatch({type : OPEN_CARD_PROFILE});
}

export const closeCardProfile = () => dispatch => {
    dispatch({type : CLOSE_CARD_PROFILE});
}