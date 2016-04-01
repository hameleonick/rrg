import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

	const store = createStore(rootReducer,initialState);
window.s = store;
	return store;
}
