import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LIKE_POST, UNLIKE_POST } from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED: 
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED: 
            return initialState;
        case SET_USER: 
            return {
                authenticated: true,
                ...action.payload
            }
        case LIKE_POST: {
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        postID: action.payload
                    }
                ]
            }
        }
        case UNLIKE_POST: {
            return {
                ...state,
                likes: state.likes.filter(like => like.postID !== action.payload.postID)
            }
        }
        default:
            return state;

    }
}