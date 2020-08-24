import { createStore, applyMiddleware, Store } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const store: Store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store;