import {GameModel} from "../store/gameModel"
import {GET_NEXT_TEXT, GET_ACTION_BUTTONS, CHANGE_CURRENT_STATE, RESET_GAME_PROGRESS, RESTART_GAME_FROM_ACTION} from '../constants/game'
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
 		case RESET_GAME_PROGRESS:
 			return resetGameProgress(state);
 		case RESTART_GAME_FROM_ACTION:
 			return restartGameFromAction(action.value, state);
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
// // console.log(currentValue)
// 		let buttons = [];
// 		currentValue.forEach((val,k)=>{ 
// 			buttons.push(val.set('disabled',true));
// 		})
// 		console.log(buttons)

// 		let temp = state.get("data").last().get("value").forEach((val,k)=>{ 
// 	return val.withMutations((v)=> { v.set("disabled",true); console.log(v.get("disabled"))});
// })

		let data = state.get("data").toJS();
		data[data.length-1].completed = true;
		for(let i=0; i < data[data.length-1].value.length ;i++)
		{
			// data[data.length-1].value[i].disabled = true;	
			if(data[data.length-1].value[i].value.join("_")==actionData.get("area")+"_"+actionData.get("step")+"_"+actionData.get("action")){
				data[data.length-1].value[i].chosen = true;
			}
			else{
				data[data.length-1].value[i].chosen = false;
			}
		}
		state.set("data", Immutable.fromJS(data));
	});

	updateLocalStorage(nextState);
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

		let textLength = state.getIn(["gameFlows",areaStep,"textLength"]);
		if(textLength != immutableGameModel.text.length){
			state.set("waitingForAction", false);
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

	updateLocalStorage(nextState);
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
		// state.set("waitingForAction", false);
		state.updateIn(["data"], data=>data.push(Immutable.fromJS({type:"action", completed:false, value: actions, gameFlows:state.get("gameFlows")})));	
	});

	updateLocalStorage(nextState);
	return nextState;
}

function updateLocalStorage(nextState){
	
	localStorage.setItem("data", JSON.stringify(nextState.get("data").toJS()))
	localStorage.setItem("gameFlows", JSON.stringify(nextState.get("gameFlows").toJS()))
	localStorage.setItem("waitingForAction", nextState.get("waitingForAction"));
	localStorage.setItem("currentGameState", JSON.stringify(nextState.get("currentGameState").toJS()));
	localStorage.setItem("gameStarted", true);
}

function resetGameProgress(state){
	
	let nextState = state.withMutations((state) => {

		let emptyData = Immutable.fromJS([]),emptyGameFlows = Immutable.fromJS({});
		state.set("data",emptyData)
			 .set("gameFlows",emptyGameFlows)
			 .set("waitingForAction",false)
			 .setIn(['currentGameState','area'],0)
			 .setIn(['currentGameState','step'],0)
			 .setIn(['currentGameState','action'],0)
			 .set("gameStarted",false);
	});

	localStorage.clear();
	return nextState;

}

function restartGameFromAction(actionData, state){

}
