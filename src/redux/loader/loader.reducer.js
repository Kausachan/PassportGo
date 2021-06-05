import {actionTypes} from '../user.actionTypes.js';

const INITIAL_STATE = {
	loader : false
}

const loaderReducer = (state  = INITIAL_STATE, action) =>
{
	switch(action.type)
	{
		case actionTypes.LOADER :
			return{
				...state,
				loader : action.payload
			}
		default :
			return state
	}
}

export default loaderReducer;