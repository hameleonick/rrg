import { OPTIONS_PAGE, MODE_PAGE, GAME_PAGE, CHANGE_CURRENT_PAGE, SHOW_OPTIONS_SECTION} from '../constants/pages'
import Immutable from "Immutable"

export default function pages(state = {}, action) {

  switch (action.type) {
  	case CHANGE_CURRENT_PAGE:  	
  		return state.set('currentPage',action.value)
  	case SHOW_OPTIONS_SECTION:
  		return state.set('showOptionSection',!state.get("showOptionSection"))
    default:
      return state;
  }
}

