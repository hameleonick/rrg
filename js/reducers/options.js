import { SOUND_TOGGLE, CHANGE_LANGUAGE, FAST_MODE_TOGGLE} from '../constants/options'


export default function options(state = {}, action) {

  switch (action.type) {
  	case SOUND_TOGGLE:
  		return state.set("sound", action.value);
  	case CHANGE_LANGUAGE:
      return state.set("currentLanguage", action.value);
  	case FAST_MODE_TOGGLE:	
      return state.set("fastMode", action.value);
    default:
      return state;
  }
}

