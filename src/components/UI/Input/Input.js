import React from 'react';
import './Input.css';
const Input = (props) => {
	let inputElement = null;

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input onChange={props.changed} className="InputElement" {...props.elementConfig} value={props.value} />
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					onChange={props.changed}
					className="InputElement"
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select onChange={props.changed} className="InputElement" value={props.value}>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					onChange={props.changed}
					value={props.value}
					className="InputElement"
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
	}
	return (
		<div className="Input">
			<label>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
