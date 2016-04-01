import { SOUND_TOGGLE, CHANGE_LANGUAGE, FAST_MODE_TOGGLE} from '../constants/options'


export default function options(state = {}, action) {

  switch (action.type) {
  	case SOUND_TOGGLE:
  		return Object.assign({}, state,{
  			sound: action.value
  		})
  	case CHANGE_LANGUAGE:
    
  		return Object.assign({}, state,{
  			currentLanguage: action.value
  		})
  	case FAST_MODE_TOGGLE:	
  		return Object.assign({}, state,{
  			fastMode: action.value
  		})
    default:
      return state;
  }
}

