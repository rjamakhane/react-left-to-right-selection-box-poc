import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const initialState = {};
const loogerAndThunkMiddleWare = [
    thunk,
    logger
]
const middleWare = [
    applyMiddleware(...loogerAndThunkMiddleWare),
    ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
];
const store = createStore(
    rootReducer,
    initialState,
    compose(...middleWare)
);

export default store;