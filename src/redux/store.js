import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./reducers/userReducers";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
const initialState = {};
const middleware = [thunk];
const reducers = combineReducers({
  user: userReducer,
  //root: persistConfig,
});
const persistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["user"], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  pReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
const persistor = persistStore(store);
export { persistor, store };
