import _ from 'lodash';
import {
    FETCH_FIRST_USERS,
    FETCH_USERS,
    LOADING,
    ERROR,
    REFRESH,
    NEXT_PAGE,
    NO_MORE_USERS
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    noMoreUsers: false,
    refresh: false,
    error: null,
    users: [],
};

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case FETCH_FIRST_USERS:
            return {
                ...state,
                users: actions.payload,
                loading: false
            };
        case FETCH_USERS:
            return {
                ...state,
                users: _.sortBy([...state.users, ...actions.payload], o => o.id),
                loading: false,
                refresh: false,
                error: null,
                noMoreUsers: actions.noMoreUsers
            };
        case NO_MORE_USERS:
            return {
                ...state,
                noMoreUsers: actions.payload
            };
        case NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1
            };
        case REFRESH:
            return {
                ...INITIAL_STATE,
                refresh: true,
                loading: true
            };
        case LOADING:
            return {
                ...state,
                loading: actions.payload
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
