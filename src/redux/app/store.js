import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import rootSaga from './rootSaga';

import authReducer from '../features/auth/slice';
import friendListReducer from '../features/friendList/slice';
import postListReducer from '../features/postList/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  friendList: friendListReducer,
  postList: postListReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'friendList', 'postList'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
