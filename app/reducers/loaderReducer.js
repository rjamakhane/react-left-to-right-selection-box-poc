import { UPDATE_LOADER } from '../constants';

const initialState = {
    loader: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOADER:
            return {
                ...state,
                loader: action.payload
            }
        default:
            return state;
    }
}