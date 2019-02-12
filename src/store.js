import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import logger from 'redux-logger';

import rootReducers from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['users']
    // blacklist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const middleware = [];

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
};

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));
export const persistor = persistStore(store);