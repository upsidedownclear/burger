import React from 'react';
import './Button.css';

const classes = [ 'Success', 'Danger' ];

const button = (props) => {
	let style = null;

	if (props.btnType === 'Danger') {
		style = 'Button Danger';
	} else {
		style = 'Button Success';
	}
	return (
		<button className={style} onClick={props.clicked}>
			{props.children}
		</button>
	);
};

export default button;
