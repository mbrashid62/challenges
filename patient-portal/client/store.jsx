import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(createLogger(), thunkMiddleware)));

export default store;
