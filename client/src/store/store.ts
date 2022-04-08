import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import { RootState } from 'store/root/types';
import { rootReducer } from 'store/root/reducer';

import { rootWatcher } from './root/saga';

// const devtools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// const store = createStore(
//   reducer,
//   applyMiddleware(thunk),
//   compose(applyMiddleware(thunk), devtools)
// );
//
// export default store;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootWatcher);

export type AppDispatch = typeof store.dispatch;
export type StoreState = RootState;
// export type ThunkType = ThunkAction<Promise<void>, RootState, {}, AnyAction>;

export { store };
