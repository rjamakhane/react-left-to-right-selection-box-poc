import {
    UPDATE_PAGE_TYPE,
    PAGE_PARAMS
} from '../constants';

const initialState = {
    type: PAGE_PARAMS.FIELD_SYCH
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PAGE_TYPE:
            return {
                ...state,
                type: action.payload
            }
        default:
            return state;
    }
}
