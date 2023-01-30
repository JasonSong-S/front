import {createStore,combineReducers} from "redux"
import { loginReducer,menuReducer } from "./reducers/login"
const rootStore = combineReducers({
    loginReducer,
    menuReducer
})
const store = createStore(rootStore)
export default store