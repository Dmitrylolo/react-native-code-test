import {
    FETCH_FIRST_USERS,
    FETCH_USERS,
    LOADING,
    ERROR,
    REFRESH
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    refresh: false,
    page: 1,
    error: null,
    users: []
};

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case FETCH_FIRST_USERS:
            return {
                users: actions.payload,
                page: 2,
                loading: false,
                refresh: false,
                error: null
            };
        case FETCH_USERS:
            return {
                users: [...state.users, actions.payload],
                page: state.page + 1,
                loading: false,
                refresh: false,
                error: null
            };
        case REFRESH:
            return {
                ...state,
                refresh: true,
                page: 1,
                users: []
            };
        case LOADING:
            return {
                ...state,
                loading: true
            };
        case ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};
