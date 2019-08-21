import { UPDATE_LOADER } from '../constants';

export const updateLoader = (data) => dispatch => {
    dispatch({
        type: UPDATE_LOADER,
        payload: data
    })
}