import React from 'react';
import './OptionBox.styles.scss';
import {Link} from 'react-router-dom';

class OptionBox extends React.Component{

	render(){
		return(
				<div className = "option-box">
					<div className = "option-box-container">
						<Link to = "/home/registration" className = "option-box-option"><h1>Registration</h1></Link>
						<Link to = "/home/verification" className = "option-box-option"><h1>Verification</h1></Link>
						<Link to = "/home/checkStatus" className = "option-box-option"><h1>Check Status</h1></Link>
					</div>
				</div>
			)
	}
}

export default OptionBox;