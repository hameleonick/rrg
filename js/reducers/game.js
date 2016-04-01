import {GameModel} from "../store/gameModel"
import {GET_NEXT_TEXT, GET_ACTION_BUTTONS, CHANGE_CURRENT_STATE} from '../constants/game'

export default function game(state = {}, action) { 
	switch (action.type) {
 		case GET_NEXT_TEXT:
 			var result = updateTextState(action.value, state); 		
			var newState = Object.assign({},state,{
 				gameFlows:result.gameFlows,
 				waitingForAction:result.waitingForAction,
 				data:result.data,
 				currentGameState:{area:action.value.area,step:action.value.step, action: action.value.action}
 			});

 			// console.log(newState)
 			return newState
 		case GET_ACTION_BUTTONS:
 			var result = updateActionState(action.value, state);
			var newState = Object.assign({},state,{
 				waitingForAction:result.waitingForAction,
 				data:result.data,
 				currentGameState:{area:action.value.area,step:action.value.step, action: action.value.action}
 			});
 			return newState;

 		case CHANGE_CURRENT_STATE:	
 			return Object.assign({},state,{
 				data: changeCurrentGameState(state),
 				currentGameState:{area:action.value.area,step:action.value.step, action: action.value.action}
 			})
	    default:
	      return state;//Object.assign({},state);
  	}
}

function changeCurrentGameState(state){

	let data = state.data.slice(0);
	console.log(data[data.length-1])
	for(let i=0; i < data[data.length-1].value.length ;i++)
	{
		data[data.length-1].value[i].disabled = true;	
	}

	return data;

}

function updateTextState(actionData, state){


	if(!actionData || isNaN(actionData.area) || isNaN(actionData.step) || isNaN(actionData.action)){
		return {};
	}

	const {area, step, action} = actionData;

	const immutableGameModel = Object.assign({},GameModel.gameFlows["area_"+area]["scene_"+step][action]);

	let nextState = Object.assign({},state); 
	let gameFlows = nextState.gameFlows//[area+"_"+step];
	if(!gameFlows[area+"_"+step])
		gameFlows[area+"_"+step] = {textLength:0,possibleAction:action};

	// console.log(step+" + "+action)
	let data = nextState.data.slice(0);
	let waitingForAction = false;

	if(gameFlows[area+"_"+step].textLength != immutableGameModel.text.length){
		data.push({type:"text", value: immutableGameModel.text[gameFlows[area+"_"+step].textLength]});
		gameFlows[area+"_"+step].textLength++;
	}
	else{
		waitingForAction = true;
		gameFlows[area+"_"+step].textLength = 0;
		gameFlows[area+"_"+step].possibleAction = action;
	}

	// nextState.gameFlows.push({area, step, action});//[area][step][action] = {};
	console.log(nextState)
	return {waitingForAction, data, gameFlows};

}

function updateActionState(actionData, state){

	const {area, step, action} = actionData;
	const immutableGameModel = Object.assign({},GameModel.gameFlows["area_"+area]["scene_"+step][action]);
	let nextState = Object.assign({},state); 
	let data = nextState.data.slice(0);

	if(immutableGameModel.actions[0].moveToScene)
	{	
		let actions = [];
		// console.log(nextState)
		for(let i=0;i<immutableGameModel.actions.length;i++){
			let moveToScene = immutableGameModel.actions[i].moveToScene
			let possibleAction = nextState.gameFlows[area+"_"+moveToScene] ? nextState.gameFlows[area+"_"+moveToScene].possibleAction : 0;
			// console.log(area+" - "+moveToScene+" - "+possibleAction)
			actions.push(Object.assign({},GameModel.gameFlows["area_"+area]["scene_"+moveToScene][possibleAction].actions[0]));
		}
		data.push({type:"action", value: actions});
	}
	else{
		
			data.push({type:"action", value: immutableGameModel.actions});
		
	}
	let waitingForAction = false;
	return {data, waitingForAction};
}

function getCurrentGameStateOld2(value, data, gameFlows, currentGameState){
	if(!value || isNaN(value.area) || isNaN(value.step))
		return {};

	const {area, step, buttonId} = value;
	
	let immutableGameModel = Object.assign({},GameModel.gameFlows["area_"+area][step]);
	
	if(!gameFlows[area+"_"+step])
	{
		gameFlows[area+"_"+step] = {textLength:0, completed:false, buttons:[], backToStep:false};
	}
	else if(gameFlows[area+"_"+step].completed)
	{

		// moveToCompletedStep = true;
		// let preaviusGameFlow = Object.assign({},GameModel.gameFlows["area_"+currentGameState.area][currentGameState.step]);
		gameFlows[area+"_"+step].textLength = 0;
		gameFlows[area+"_"+step].completed = false;
		// gameFlows[area+"_"+step].backToStep = true;

		// if(!gameFlows[area+"_"+step].buttons)
		// {
		// 	let tmp = {}
		// 	gameFlows[area+"_"+step].buttons.push;	
		// }
		// console.log()
		// gameFlows[area+"_"+step].buttons[buttonId] = preaviusGameFlow.actions[buttonId];

	}

	let nextFlow = gameFlows[area+"_"+step];
	let waitingForAction = true;
	if(!isNaN(buttonId)){
		nextFlow.buttons.push({buttonId:buttonId, area:currentGameState.area, step: currentGameState.step})
	}

	if(nextFlow.textLength != immutableGameModel.text.length){
		data.push({type:"text", value: immutableGameModel.text[nextFlow.textLength]});
		nextFlow.textLength++;
		waitingForAction = false;
	}
	else{
		let actionsTemp=[];


		actionsTemp.push({value:immutableGameModel.actions[0].value, text:immutableGameModel.actions[0].text});
		if(immutableGameModel.actions[1])
			actionsTemp.push({value:immutableGameModel.actions[1].value, text:immutableGameModel.actions[1].text});
		nextFlow.completed = true;
		if(nextFlow.backToStep){
			let buttonsTemp = nextFlow.buttons[nextFlow.buttons.length-1];
			let preaviusGameFlow = Object.assign({},GameModel.gameFlows["area_"+buttonsTemp.area][buttonsTemp.step]);
			console.log(123)
			console.log(preaviusGameFlow)
			var prevButId = buttonsTemp.buttonId
			if(buttonsTemp.buttonId<0)
				buttonsTemp.buttonId = 1
			else
				buttonsTemp.buttonId = 0;


			actionsTemp[prevButId] = {value:preaviusGameFlow.actions[buttonsTemp.buttonId].value, text:preaviusGameFlow.actions[buttonsTemp.buttonId].text}
			// immutableGameModel.actions[prevButId].value = preaviusGameFlow.actions[buttonsTemp.buttonId].value;
			// immutableGameModel.actions[prevButId].text = preaviusGameFlow.actions[buttonsTemp.buttonId].text;
			nextFlow.backToStep = false
		}

		// for(let k in gameFlows[area+"_"+step].buttons){
		// 	// alert("ok")
		// 	console.log(1112222)
		// 	console.log(gameFlows[area+"_"+step].buttons)
		// 	console.log(gameFlows[area+"_"+step].buttons[k])
		// 	immutableGameModel.actions[k] = gameFlows[area+"_"+step].buttons[k];
		// }

		// if(gameFlows[area+"_"+step].buttons){
		// 	console.log("-0000000000")
		// 	// console.log(preaviusGameFlow)
		// 	immutableGameModel.actions[0].value = gameFlows[area+"_"+step].preaviusGameFlow.actions[0].value;
		// 	immutableGameModel.actions[0].text = gameFlows[area+"_"+step].preaviusGameFlow.actions[0].text;	
		// }
		

		// for(let i=0;i<immutableGameModel.actions.length;i++)
		// {
		// 	if(immutableGameModel.actions[i].ifCompleteValue && gameFlows[immutableGameModel.actions[i].value.join("_")] && gameFlows[immutableGameModel.actions[i].value.join("_")].completed)
		// 	{
		// 		immutableGameModel.actions[i].value = immutableGameModel.actions[i].ifCompleteValue;
		// 		immutableGameModel.actions[i].text = immutableGameModel.actions[i].ifCompleteText;	
		// 	}

		// }
		
		data.push({type:"action", value: actionsTemp});
	}

	return {gameFlows, data, waitingForAction};

}




function getActualAction(){

}
