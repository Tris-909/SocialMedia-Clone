import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, OPEN_CARD_PROFILE, CLOSE_CARD_PROFILE} from '../types';

const initialState = {
    loading: false,
    errors: null,
    openCardProfile: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS: 
            return {
                ...state,
                loading: false,
                errors: null
            }
        case LOADING_UI: 
            return {
                ...state,
                loading: true
            }
        case OPEN_CARD_PROFILE: 
            return {
                ...state,
                openCardProfile: true
            }
        case CLOSE_CARD_PROFILE: 
            return {
                ...state,
                openCardProfile: false
            }
        default:
            return state; 
    }
}