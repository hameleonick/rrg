import * as mode from '../constants/mode'

export const ChangeModeLanguage = (value)=>{
	return {
		type: mode.CHANGE_MODE_LANGUAGE,
		value: value
	}	
}