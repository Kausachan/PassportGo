import React from 'react';
import './FormInput.styles.scss';

const FormInput = ({invalid, handleChange, label, register, dob, ...others}) =>{
	return(
		<div className = {`${register ? 'group-register' : ''} group`}>
			<input className = {`${invalid ? 'red' : ''} form-input`} onChange = {handleChange} {...others}/>
			{
				(label && !dob)?
				(<label className = {`${others.value.length ? 'shrink' : ''} form-input-label`}>
					{label}
					</label>
					)
				: null
			}
		</div>
		)
}

export default FormInput;