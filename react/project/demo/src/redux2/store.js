import { createStore,applyMiddleware ,combineReducers} from "redux";
import myReducer from "./reducer";
import thunk from "redux-thunk"
import { homeReducer2 } from "./reducers/home";
import { aboutReducer2 } from "./reducers/about";

const rootReducer2 = combineReducers({
    homeReducer2,
    aboutReducer2
})
const store = createStore(rootReducer2,applyMiddleware(thunk))

export default store