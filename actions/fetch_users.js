import axios from 'axios';
import {
    LOADING,
    FETCH_USERS,
    FETCH_FIRST_USERS,
    REFRESH
} from './types.js';
import api from './api';

export const makeRequest = (page) => async (dispatch) => {
    dispatch({ type: LOADING });
    console.log('page', page);
    const url = `${api.url}?page=${page}`;
    try {
        if (page === 1) {
            let data = await axios.get(url);
            dispatch({ type: FETCH_FIRST_USERS, payload: data.data.data });
            return null;
        }

        let data = await axios.get(url);
        if (data.data.data.length > 0) {
            data.data.data.map(user => dispatch({ type: FETCH_USERS, payload: user }));
            return null;
        }
    } catch (e) {
        console.log('error fetching users => ', e.status);
    }
};

export const isRefreshing = () => dispatch => {
    dispatch({ type: REFRESH });
};
