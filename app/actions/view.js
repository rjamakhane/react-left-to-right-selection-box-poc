import { UPDATE_PAGE_TYPE } from '../constants';

export const updatePageType = (data) => dispatch => {
    dispatch({
        type: UPDATE_PAGE_TYPE,
        payload: data
    })
};