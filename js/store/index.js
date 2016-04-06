import { createStore } from 'redux';
import rootReducer from '../reducers';
import Immutable from "Immutable"

export default function configureStore(initialState) {

	const store = createStore(rootReducer,restoreData(initialState));

	return store;
}

function restoreData(initialState){

	if(localStorage.getItem("gameStarted")) {
		return initialState.withMutations((state)=>{
			let waitingForAction = false;
			if(localStorage.getItem("waitingForAction") === "true")
				waitingForAction = true;
			state.setIn(['game','currentGameState'],Immutable.fromJS(JSON.parse(localStorage.getItem("currentGameState"))));
			state.setIn(['game','data'],Immutable.fromJS(JSON.parse(localStorage.getItem("data"))));
			state.setIn(['game','gameFlows'],Immutable.fromJS(JSON.parse(localStorage.getItem("gameFlows"))));
			state.setIn(['game','waitingForAction'],waitingForAction);
			state.setIn(['game','gameStarted'],true);
		});			
	}
	else{
		return initialState;
	}

}
