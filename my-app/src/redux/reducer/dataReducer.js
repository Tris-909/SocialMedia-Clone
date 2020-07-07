import { SET_POSTS, LIKE_POST, POST_A_POST, UNLIKE_POST, LOADING_DATA, DELETE_POST } from '../types';

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
        case POST_A_POST: 
            return {
                ...state,
                posts: [
                    actions.payload,
                    ...state.posts
                ]
            }
        case LIKE_POST: 
        case UNLIKE_POST: 
            let index = state.posts.findIndex((post) => post.postID === actions.payload.postID);
            state.posts[index] = actions.payload;
            return {
                ...state
            }
        case DELETE_POST: 
            let delIndex = state.posts.findIndex((post) => post.postID === actions.payload.postID);
            state.posts.splice(delIndex, 1);
            return {
                ...state
            }
        default: 
            return state
    }
}