import * as page from '../constants/pages'

export const ChangeCurrentPage = (value)=>{
	return {
		type: page.CHANGE_CURRENT_PAGE,
		value: value
	}
}

export const ShowOptionsSection = (value)=>{
	return {
		type: page.SHOW_OPTIONS_SECTION,
		value: value
	}
}