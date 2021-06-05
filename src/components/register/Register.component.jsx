import React from 'react';
import './Register.styles.scss';
import FormInput from '../forminput/FormInput.component';
import CustomButton from '../custombutton/CustomButton.component';
import {connect} from 'react-redux';
import {firestore} from '../../firebase/Firebase.utils';

class Register extends React.Component{
	constructor(props){
		super(props);
			this.state = {
				email : '',
				name : '',
				fathername : '',
				mothername : '',
				gender : '',
				age : '',
				dob : '',
				placeofbirth : '',
				address : ''

		}
	}

	handleSubmit = async (event) =>{
		const {currentUser} = this.props;
		event.preventDefault();
		try
		{
			const userRef = await firestore.doc(`users/${currentUser.id}/kyc_details/Registration`);
			userRef.set({...this.state});
			const docRef = await firestore.doc(`users/${currentUser.id}`);
			docRef.update({Registration : true});
			this.setState({
				email : '',
				name : '',
				fathername : '',
				mothername : '',
				gender : '',
				age : '',
				dob : '',
				placeofbirth : '',
				address : ''}, () => alert("Registration successful"));
		}catch(e){
			alert("error occured");
		}
		
	}

	handleChange = (event) =>{
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	radioChange = (event) =>{
		const {name, value} = event.target;
		this.setState({[name] : value});
	}

	render(){
		console.log(this.state.gender);
		return(
				<div className = "register-input">
					<div className = "register-text">Registration Form</div>
					<form onSubmit = {this.handleSubmit} className = "register-form-input">
						<div className = "register-input-child1">
							<FormInput
							type = "text"
							label = "Email"
							value = {this.state.email}
							name = "email"
							handleChange = {this.handleChange}
							required
							register/>
							<FormInput
							type = "text"
							label = "Name"
							value = {this.state.name}
							name = "name"
							handleChange = {this.handleChange}
							required
							register/>
							<FormInput
							type = "text"
							label = "Father's Name"
							value = {this.state.fathername}
							name = "fathername"
							handleChange = {this.handleChange}
							required
							register/>
							<FormInput
							type = "text"
							label = "Mother's Name"
							value = {this.state.mothername}
							name = "mothername"
							handleChange = {this.handleChange}
							required
							register/>
							<h4>Gender</h4>
								<div>
									<label className="container">Male
									  <input type="radio" name="gender" value = "male" onChange = {this.radioChange}/>
									  <span className="checkmark"></span>
									</label>
									<label className="container">Female
									  <input type="radio" name="gender" value = "female" onChange = {this.radioChange}/>
									  <span className="checkmark"></span>
									</label>
									<label className="container">Other
									  <input type="radio" name="gender" value = "other" onChange = {this.radioChange}/>
									  <span className="checkmark"></span>
									</label>
								</div>
							</div>
							<div className = "register-input-child2">
								<FormInput
								type = "number"
								label = "Age"
								value = {this.state.age}
								name = "age"
								handleChange = {this.handleChange}
								required
								register/>
								<FormInput
								type = "text"
								label = "Place Of Birth"
								value = {this.state.placeofbirth}
								name = "placeofbirth"
								handleChange = {this.handleChange}
								required
								register/>
								<FormInput
								type = "date"
								label = "Date Of Birth"
								value = {this.state.dob}
								placeholder = {null}
								name = "dob"
								handleChange = {this.handleChange}
								required
								dob
								register/>
								<FormInput
								type = "text"
								label = "Address"
								value = {this.state.address}
								name = "address"
								handleChange = {this.handleChange}
								required
								register/>
								<CustomButton type = "submit" style = {{marginTop : "60px"}}>Register</CustomButton>
							</div>
					</form>
				</div>
			)
	}
}

const mapStateToProps = ({user}) =>({
	currentUser : user.currentUser
}) 

export default connect(mapStateToProps)(Register);