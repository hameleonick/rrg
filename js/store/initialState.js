import Immutable from "Immutable"


export const initialState = Immutable.fromJS({
	options:{
		sound: false,
		currentLanguage: "EN",
		fastMode: false,
		languagesList:["EN","RU","UA","PL"]
	},
	pages:{
		currentPage: "MODE_PAGE",
  		pages: [],
  		showOptionSection: false	
	},
	mode:{

	},
	game:{
		gameStarted: false,
		defaultTextDelay: "500",
		fastModeTextDelay: "3000",
		currentGameState:{area:0,step:0, action:0},
		waitingForAction: false,
		data: [
			// {type:"text", value:""},
			// {type:"action", value:}
		],
		gameFlows:{
			// "0_0":{
			// 	textLength:0,
			// 	completed: false
			// }
		}
	}
});

	// texts:[],
	// 	actions:[],
	// 	completedActions:{
	// 		"0_0":{
	// 			area:0,
	// 			step:0,
	// 			textsCount:0,
	// 			actionId:
	// 		}
	// 	}