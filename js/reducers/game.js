import {GameModel} from "../store/gameModel"
import {GET_NEXT_TEXT, GET_ACTION_BUTTONS, CHANGE_CURRENT_STATE} from '../constants/game'
import _ from "lodash"
import Immutable from "Immutable"

export default function game(state = {}, action) { 
	switch (action.type) {
 		case GET_NEXT_TEXT:
 			return updateTextState(action.value, state); 		
 		case GET_ACTION_BUTTONS:
 			return updateActionState(action.value, state);
 		case CHANGE_CURRENT_STATE:	
 			return changeCurrentGameState(action.value, state);
	    default:
	      return state;//Object.assign({},state);
  	}
}

function changeCurrentGameState(actionData,state){



	let nextState = state.withMutations((state) => {
	
		state.setIn(['currentGameState','area'],actionData.get("area"));
		state.setIn(['currentGameState','step'],actionData.get("step"));
		state.setIn(['currentGameState','action'],actionData.get("action"));

// 		let currentData = state.get("data").last();
// console.log(currentData)
// 		let currentValue = currentData.get("value")
// console.log(currentValue)
// 		currentValue.forEach((val,k)=>{ 
// 			return val.withMutations((v)=> { v.set("disabled",true); console.log(v.get("disabled"))});
// 		})
// 		console.log(currentValue)

// 		let temp = state.get("data").last().get("value").forEach((val,k)=>{ 
// 	return val.withMutations((v)=> { v.set("disabled",true); console.log(v.get("disabled"))});
// })

		let data = state.get("data").toJS();
		for(let i=0; i < data[data.length-1].value.length ;i++)
		{
			data[data.length-1].value[i].disabled = true;	
		}
		state.set("data", Immutable.fromJS(data));
	});

	return nextState;

}

function updateTextState(actionData, state){

	if(!actionData || isNaN(actionData.get("area")) || isNaN(actionData.get("step")) || isNaN(actionData.get("action"))){
		return state;
	}

	const area = actionData.get("area"), 
		  step= actionData.get("step"), 
		  action = actionData.get("action"),
		  areaStep = area+"_"+step;
	const immutableGameModel = _.extend({},GameModel.gameFlows["area_"+area]["scene_"+step][action]);

	let nextState = state.withMutations((state) => {
	  	if(!state.get("gameFlows").get(areaStep))
			state.setIn(["gameFlows",areaStep],Immutable.fromJS({textLength:0,possibleAction:action}));

		state.set("waitingForAction", false);
		let textLength = state.getIn(["gameFlows",areaStep,"textLength"]);
		if(textLength != immutableGameModel.text.length){
			state.setIn(["gameFlows",areaStep, 'textLength'], textLength+1); 
			state.updateIn(["data"], data=>data.push(Immutable.fromJS({type:"text", value: immutableGameModel.text[textLength]})));	
			
		}
		else{
			state.set("waitingForAction", true);
			state.setIn(["gameFlows",areaStep, 'textLength'], 0); 
			state.setIn(["gameFlows",areaStep, 'possibleAction'], action); 
		}

		return state;
	});

	return nextState;

}

function updateActionState(actionData, state){

	const area = actionData.get("area"), 
		  step= actionData.get("step"), 
		  action = actionData.get("action"),
		  areaStep = area+"_"+step;
	const immutableGameModel = _.extend({},GameModel.gameFlows["area_"+area]["scene_"+step][action]);

	let actions = immutableGameModel.actions;
	if(immutableGameModel.actions[0].moveToScene)
	{	
		actions = [];
		for(let i=0;i<immutableGameModel.actions.length;i++){
			let moveToScene = immutableGameModel.actions[i].moveToScene
			let possibleAction = state.get("gameFlows").get(area+"_"+moveToScene) ? state.getIn(["gameFlows",area+"_"+moveToScene,"possibleAction"]) : 0;
			actions.push(GameModel.gameFlows["area_"+area]["scene_"+moveToScene][possibleAction].actions[0]);
		}
	}
	
	let nextState = state.withMutations((state) => {
		state.set("waitingForAction", false);
		state.updateIn(["data"], data=>data.push(Immutable.fromJS({type:"action", value: actions})));	
	});

	return nextState;
}

