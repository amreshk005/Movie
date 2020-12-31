import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import movie from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(movie, composeEnhancers(applyMiddleware(thunk)));
export { store };
