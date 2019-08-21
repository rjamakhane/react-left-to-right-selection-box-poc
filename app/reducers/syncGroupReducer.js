import {
    FETCH_SYNC_GROUP_INFO
} from '../constants';

const initialState = {
    data : []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SYNC_GROUP_INFO:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}
