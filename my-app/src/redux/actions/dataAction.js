import {SET_POSTS, SET_POST ,POST_A_POST, COMMENT_A_POST, DELETE_A_COMMENT ,LOADING_DATA, LIKE_POST, UNLIKE_POST, CLEAR_ERRORS ,LOADING_UI,DELETE_POST} from '../types';
import axios from 'axios';

//GET ALL POSTS
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

//DELETE A COMMENT
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

//LIKE A POST
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

//UNLIKE A POST
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

//DELETE A POST
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

