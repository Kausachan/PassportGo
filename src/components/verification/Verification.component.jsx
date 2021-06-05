import React from 'react';
import './Verification.styles.scss';
import FormInput from '../forminput/FormInput.component';
import CustomButton from '../custombutton/CustomButton.component';
import {connect} from 'react-redux';
import {firestore} from '../../firebase/Firebase.utils';

class Verification extends React.Component{

	constructor(){
		super();
		this.state = {
			adhaar : '',
			birthcertificate : '',
			pancard : ''
		}
	}

	handleSubmit = async(event) =>{
		const {currentUser} = this.props;
		event.preventDefault();
		try{
			const userRef = await firestore.doc(`users/${currentUser.id}/kyc_details/Verification`);
			userRef.set({...this.state});
			const docRef = await firestore.doc(`users/${currentUser.id}`);
			const date = new Date();
			docRef.update({Verification : true,
				verifiedAt : date,
				status : false
			});
			this.setState({
				adhaar : '',
				birthcertificate : '',
				pancard : ''
			}, () => alert("Verification details submitted successfully"));
			
		}catch(e){
			alert('error occured');
		}
	}

	handleChange = (event) =>{
		const {name, value} = event.target;
		this.setState({[name] : value});
	}

	render(){
		return(
				<div className = "verification-input">
					<form className = "verification-form-input" onSubmit = {this.handleSubmit}>
						<div className = "verification-text">Verification Form </div>
						<FormInput
							type = "url"
							label = "Adhaar URL"
							value = {this.state.adhaar}
							name = "adhaar"
							handleChange = {this.handleChange}
							required
							register
						/>
						<FormInput
							type = "url"
							label = "Pancard URL"
							value = {this.state.pancard}
							name = "pancard"
							handleChange = {this.handleChange}
							required
							register
						/>
						<FormInput
							type = "url"
							label = "Birth Certificate URL"
							value = {this.state.birthcertificate}
							name = "birthcertificate"
							handleChange = {this.handleChange}
							required
							register
						/>
						<CustomButton type = "submit">Submit</CustomButton>
					</form>
				</div>
			)
	}
}

const mapStateToProps = ({user}) =>({
	currentUser : user.currentUser
})

export default connect(mapStateToProps)(Verification);