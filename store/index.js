import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'likedJobs',
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  {},
  compose(
    applyMiddleware(thunk),
  )
);

persistStore(store);

export default store;
