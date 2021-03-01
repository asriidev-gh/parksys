import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducers";
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {createLogger} from 'redux-logger';

import { persistReducer } from "redux-persist";
import storage from  "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const initialState = {};

const logger = createLogger({
    collapsed: true,
    diff: true
});

const middleware = [thunk,logger];

const store = createStore(persistedReducer, initialState, 
    composeWithDevTools(        
        applyMiddleware(...middleware)  
    )    
);

export default store;