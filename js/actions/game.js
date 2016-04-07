import * as game from '../constants/game'

export const GetNextText = (value)=>{
	return {
		type: game.GET_NEXT_TEXT,
		value: value
	}
}

export const GetActionButtons = (value)=>{
	return {
		type: game.GET_ACTION_BUTTONS,
		value: value
	}
}

export const ChangeCurrentState = (value)=>{
	return {
		type: game.CHANGE_CURRENT_STATE,
		value: value
	}
}

export const ResetGameProgress = (value)=> {
	return {
		type: game.RESET_GAME_PROGRESS,
		value: value
	}
}