import { combineReducers } from 'redux'
import counterReducer from './counter'
import home from './home'

const rootReducer = combineReducers({
  count: counterReducer,
})

export default rootReducer
