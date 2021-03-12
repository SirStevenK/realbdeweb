import {
  createStore,
  applyMiddleware,
  Middleware,
  Store,
  combineReducers,
} from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import basicReducer from "./basic/reducers";

const rootReducer = combineReducers({
  basic: basicReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const initStore = (): Store<RootState> => {
  return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(initStore);
