import { OPTIONS_PAGE, MODE_PAGE, GAME_PAGE, CHANGE_CURRENT_PAGE} from '../constants/pages'


export default function pages(state = {}, action) {

  switch (action.type) {
  	case CHANGE_CURRENT_PAGE:
  		return Object.assign({}, state,{
  			currentPage: action.value
  		})
    default:
      return state;
  }
}

