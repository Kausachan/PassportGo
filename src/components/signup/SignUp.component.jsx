import React from 'react';
import {auth, createUserProfile} from '../../firebase/Firebase.utils';
import FormInput from '../forminput/FormInput.component';
import CustomButton from '../custombutton/CustomButton.component';
import './SignUp.styles.scss';
import {setLoader} from '../../redux/loader/loader.actions'; 
import {connect} from 'react-redux';

class SignUp extends React.Component{
	constructor(){
		super();
		this.state = {
			displayName : '',
			password : '',
			confirmPassword : '',
			email : ''
		}
	}

	handleSubmit = (event) =>{
		event.preventDefault();
		const {displayName, email, confirmPassword, password} = this.state;
		const {setLoader} = this.props;
		if(password !== confirmPassword)
		{
			alert("password don't match");
			return;
		}
		const func = async(displayName, email, confirmPassword, password) =>{
			try{
			const {user} = await auth.createUserWithEmailAndPassword(email, password)
			createUserProfile(user, {displayName})
			}
			catch(error){
				alert("error occured try again later...");
				console.error(error)
			}
			this.setState({displayName : '',
				password : '',
				confirmPassword : '',
				email : ''})
			setLoader(null);
		} 
		func(displayName, email, confirmPassword, password);
		setLoader(true);
	}

	handleChange = event =>{
		const {name, value} = event.target;
		this.setState({
			[name] : value
		})
	}
	render(){
		const {displayName, email, confirmPassword, password} = this.state;
		return(
			<div className = "sign-up">
				<h1 className = "title" style = {{fontWeight : "bold"}}> I Don't Have An Account</h1>
				<form onSubmit = {this.handleSubmit}>
					<FormInput
						type = "text"
						label = "Name"
						value = {displayName}
						name = "displayName"
						handleChange = {this.handleChange}
						required
					/>
					<FormInput
						type = "email"
						label = "Email"
						value = {email}
						name = "email"
						handleChange = {this.handleChange}
						required
					/>
					<FormInput
						type = "password"
						label = "Password"
						value = {password}
						name = "password"
						handleChange = {this.handleChange}
						required
					/>
					<FormInput
						type = "password"
						label = "Confirm Password"
						value = {confirmPassword}
						name = "confirmPassword"
						handleChange = {this.handleChange}
						required
					/>
					<CustomButton type = "submit"> SIGN UP </CustomButton>
				</form>
			</div>
			)
	}
}


const dispatchAction = (dispatch) =>({
	setLoader : loader => dispatch(setLoader(loader))
})


export default connect(null, dispatchAction)(SignUp);