import reducers from "./reducers"
import thunk from "redux-thunk";
import {applyMiddleware, createStore, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"

const rootReducer = combineReducers(reducers);
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




