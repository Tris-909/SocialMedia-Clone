import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type : LOADING_UI});
    axios.post('/login', userData)
    .then(res => {
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});
        history.push('/');
        setTimeout(window.location.reload(),2);
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
}
 
export const signupUser = (userInput, history) => (dispatch) => {
    dispatch({type : LOADING_UI});
    axios.post('/signup', userInput)
        .then(res => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
    setTimeout(window.location.reload(),2);
}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
            setTimeout(window.location.reload(),2);
        })
        .catch(err => {
            console.log(err);
        })
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/user', userDetails)
    .then(() => {
        dispatch(getUserData());
    })
    .catch((err) => console.log(err));
}