import {actionTypes} from '../user.actionTypes';

export const setLoader = (loader) =>({
	type : actionTypes.LOADER,
	payload : loader
})