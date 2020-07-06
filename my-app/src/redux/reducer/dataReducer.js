import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA } from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function(state = initialState, actions) {
    switch(actions.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_POSTS: 
            return {
                ...state,
                posts: actions.payload,
                loading: false 
            }
        case LIKE_POST: 
        case UNLIKE_POST: 
            let index = state.posts.findIndex((post) => post.postID === actions.payload.postID);
            state.posts[index] = actions.payload;
            return {
                ...state
            }
        default: 
            return state
    }
}