import axios from 'axios';
import {
    LOADING,
    FETCH_USERS,
    FETCH_FIRST_USERS,
    REFRESH,
    NEXT_PAGE,
    NO_MORE_USERS
} from './types.js';
import api from './api';

export const makeRequest = (page) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    const url = `${api.url}?page=${page}`;

    if (page === 1) {
        let data = await axios.get(url);
        dispatch({ type: FETCH_FIRST_USERS, payload: data.data.data });
        return null;
    }

    axios.get(url)
        .then((data) => {
            dispatch({
                type: FETCH_USERS,
                payload: data.data.data,
                noMoreUsers: data.data.data.length > 0 ? false : true
            });
            return null;
        })
        .catch(e => console.log('error fetching users => ', e.status))

};

export const isRefreshing = () => dispatch => {
    dispatch({ type: REFRESH });
};
