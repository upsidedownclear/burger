import React from 'react';

import './NavigationItem.css';

const navigationItem = (props) => (
	<li className="NavigationItem">
		<a href={props.link} className={props.active ? null : null}>
			{props.children}
		</a>
	</li>
);

export default navigationItem;
