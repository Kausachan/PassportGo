import React from 'react';
import {connect} from 'react-redux';

const CheckStatus = ({currentUser}) =>{
	return(
		<div>
		{
			!currentUser.status ?
			<h1>Verification In Progress</h1>
			:
			<h1>You Will Recieve Passport Shortly</h1>
		}
		</div>
		)
}

const mapStateToProps = ({user}) =>({
	currentUser : user.currentUser
})

export default connect(mapStateToProps)(CheckStatus);