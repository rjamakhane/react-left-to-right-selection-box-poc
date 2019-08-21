import { combineReducers } from 'redux';

import fieldSyncReducer from './fieldSynchReducer';
import loaderReducer from './loaderReducer';
import synGroupReducer from './syncGroupReducer';
import viewReducer from './viewReducer';

export default combineReducers({
    fieldSyncState: fieldSyncReducer,
    loaderState: loaderReducer,
    syncGroupState : synGroupReducer,
    viewState : viewReducer

});