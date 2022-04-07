import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import { RootState } from 'store/root/types';
import { rootReducer } from 'store/root/reducer';

// const devtools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// const store = createStore(
//   reducer,
//   applyMiddleware(thunk),
//   compose(applyMiddleware(thunk), devtools)
// );
//
// export default store;

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type StoreState = RootState;
// export type ThunkType = ThunkAction<Promise<void>, RootState, {}, AnyAction>;

export { store };
