import { 
    SET_POSTS, 
    SET_POST, 
    COMMENT_A_POST,
    LIKE_POST, 
    POST_A_POST, 
    UNLIKE_POST, 
    LOADING_DATA, 
    DELETE_POST, 
    DELETE_A_COMMENT,
    GET_USERS,
    GET_SINGLE_USER
} from '../types';

const initialState = {
    users: [],
    posts: [],
    post: {},
    singleUser: {},
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
        case GET_USERS: 
            return {
                ...state,
                users: actions.payload,
                loading: false
            }
        case GET_SINGLE_USER:
            return {
                ...state,
                singleUser: actions.payload,
                loading: false
            }
        case COMMENT_A_POST:
            let curComments = [...state.post.comments];
            curComments.unshift(actions.payload)
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [
                        ...curComments
                    ]
                }
            }
        case DELETE_A_COMMENT:
            let delCIndex = state.post.comments.findIndex(comment => comment.commentID === actions.payload.commentID);
            state.post.comments.splice(delCIndex, 1);
            return {
                ...state
            }
        case SET_POST: 
            return {
                ...state,
                post: actions.payload
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