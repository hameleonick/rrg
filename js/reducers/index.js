import { combineReducers } from 'redux'
import options from './options'
import pages from './pages'
import mode from './mode'
import game from './game'

const rootReducer = combineReducers({
  options,
  pages,
  mode,
  game
})

export default rootReducer

