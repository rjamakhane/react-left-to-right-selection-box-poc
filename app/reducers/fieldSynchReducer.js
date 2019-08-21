import {
    FETCH_FIELDS_RELATED_TO_OBJECT,
    FETCH_SELECTED_FIELDS_OF_OBJECT_SYNCH,
    UPDATE_ADDED_FIELDS,
    REMOVE_FIELD,
    UPDATE_FIELDS,
    UPDATE_REMOVED_FIELDS,
    UPDATE_SAVE_BUTTON_STATUS
} from '../constants';

const initialState = {
    selectedFields: [],
    allFields: [],
    addedFields: [],
    removedFields: [],
    fields: [], //filtered fields
    saveButtonStatus: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FIELDS_RELATED_TO_OBJECT:
            return {
                ...state,
                allFields: [...action.payload]
            }
        case FETCH_SELECTED_FIELDS_OF_OBJECT_SYNCH:
            return {
                ...state,
                removedFields: [],
                addedFields : [...action.payload.parsedSelectedFields],
                selectedFields: [...action.payload.entities]
            }
        case UPDATE_ADDED_FIELDS:
            return {
                ...state,
                addedFields: [...action.payload]
            }
        case UPDATE_REMOVED_FIELDS:
            return {
                ...state,
                removedFields: [...action.payload]
            }
        case UPDATE_FIELDS:
            return {
                ...state,
                fields: [...action.payload]
            }
        case UPDATE_SAVE_BUTTON_STATUS:
            return {
                ...state,
                saveButtonStatus: action.payload
            }
        default:
            return state;
    }
}