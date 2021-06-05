import React from 'react';
import {connect} from 'react-redux';

const CheckStatus = ({currentUser}) =>{
	return(
		<div>
		{
			!currentUser.status ?
			<h1> You will recieve passport shortly</h1>
			:
			<h1>Your Passport Has been delivered</h1>
		}
		</div>
		)
}

const mapStateToProps = ({user}) =>({
	currentUser : user.currentUser
})

export default connect(mapStateToProps)(CheckStatus);