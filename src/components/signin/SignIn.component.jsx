import React, {Component} from 'react';
import './SignIn.styles.scss';
import CustomButton from '../custombutton/CustomButton.component';
import FormInput from '../forminput/FormInput.component';
import {signInWithGoogle, auth} from '../../firebase/Firebase.utils';
import {setLoader} from '../../redux/loader/loader.actions'; 
import {connect} from 'react-redux';
import Loader from 'react-loader';

class SignIn extends Component{
	constructor(props){
		super(props);
		this.state = {
			email : '',
			password : '',
			invalid : false
		}
	}

	handleSubmit = (event) =>{
		const {email, password} = this.state;
		const {setLoader} = this.props;
		event.preventDefault();
		const func = async (email, password) =>{
			try{
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({email : '',
				password : '',
				invalid : false})
			}
			catch(err){
				this.setState({
					email : '',
					password : '',
					invalid : true})
			}
			setLoader(null)
		}
		func(email, password);
		setLoader(true)
	}

	handleChange = (event) =>{
		const {name, value} = event.target
		this.setState({
			[name] : value
		})
	} 

	render(){
		const {email, password, invalid} = this.state;
		return(
			<div className = 'sign-in'>
				<h3>I Already Have An Account</h3>
				<form onSubmit = {this.handleSubmit}>

					{
						invalid ?
						<p style = {{color : "#c41e0c"}}> invalid username or password</p>
						:
						null
					}
					<FormInput
						invalid = {invalid}
						name = "email"
						type = "email"
						label = "Email"
						value = {email}
						handleChange = {this.handleChange} 
						required
					/>
					<FormInput
						invalid = {invalid}
						name = "password"
						type = "password"
						label = "Password"
						value = {password}
						handleChange = {this.handleChange} 
						required
					/>
					<div className = 'button'>
						<CustomButton type = "submit" onClick = {this.handleSubmit}> {
							this.props.loader ?
								(
									<Loader loaded={false} lines={13} length={20} width={10} radius={30}
									    corners={1} rotate={0} direction={1} color="#000" speed={1}
									    trail={60} shadow={false} hwaccel={false} className="spinner"
									    zIndex={2e9} top="50%" left="50%" scale={1.00}
									    loadedClassName="loadedContent" />
									)
							:
								`SIGN IN`
						} </CustomButton>
						<CustomButton type = "submit"  onClick = {() => signInWithGoogle()} IsGoogleSignin> SIGN IN WITH GOOGLE </CustomButton>
					</div>
				</form>

			</div>
			)
	}
}

const mapStateToProps = ({loader}) =>({
	loader : loader.loader
})

const dispatchAction = (dispatch) =>({
	setLoader : loader => dispatch(setLoader(loader))
})

export default connect(mapStateToProps, dispatchAction)(SignIn);