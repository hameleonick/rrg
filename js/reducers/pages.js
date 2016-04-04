import { OPTIONS_PAGE, MODE_PAGE, GAME_PAGE, CHANGE_CURRENT_PAGE} from '../constants/pages'
import Immutable from "Immutable"

export default function pages(state = {}, action) {

  switch (action.type) {
  	case CHANGE_CURRENT_PAGE:
  	
  		return state.set('currentPage',action.value)


  		// Object.assign({}, state,{
  		// 	currentPage: action.value
  		// })
    default:
      return state;
  }
}

