import {createStore,combineReducers} from "redux"
import { homeReducer } from "./reducers/home"
import { aboutReducer } from "./reducers/about"
const rootReducer = combineReducers({
    homeReducer,
    aboutReducer
})
const store = createStore(rootReducer)
export default store