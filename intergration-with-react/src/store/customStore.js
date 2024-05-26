import reducer from "./reducer";

// implement a private property by using closure
function createStore(reducer){
	let state;
	let listeners = [];
	
	function getState(){
		return state;
	}
	
	function subscribe(listener){
        listeners.push(listener);
    }
	
	function dispatch(action){
		// call the reducer 
		state = reducer(state, action);
		// notify the subscribers
        for(let i = 0; i < listeners.length; i++){
            listeners[i]();
        }
	}
	
	return {
		getState,
		dispatch,
		subscribe,
	}
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;