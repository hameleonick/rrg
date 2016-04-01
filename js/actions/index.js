import * as options from '../constants/options'

export const ToggleSound = (value) => {
  return {
    type: options.SOUND_TOGGLE,
    value: value
  }
}

export const ToggleFastMode = (value)=>{
	return {
		type: options.FAST_MODE_TOGGLE,
		value: value
	}
}


export const ChangeLanguage = (value)=>{
	return {
		type: options.CHANGE_LANGUAGE,
		value: value
	}
}