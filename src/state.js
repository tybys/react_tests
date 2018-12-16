import {createStore} from 'redux';

function reducer(state, action) {
	//debugger
	switch (action.type) {
		case 'newlist':
			return {...state, ...{list: action.list}};
		default:
			return state;
	}
}

const store = createStore(reducer, {
	list: []
});

export default store;