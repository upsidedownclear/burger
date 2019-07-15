import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Insalata', type: 'salad' },
	{ label: 'pollo', type: 'bacon' },
	{ label: 'Formaggio', type: 'cheese' },
	{ label: 'Hamburger', type: 'meat' }
];

const buildControls = (props) => (
	<div className="BuildControls">
		<p>
			Prezzo: <strong>{props.price.toFixed(2)} Euro</strong>
		</p>
		{controls.map((ctrl) => (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]}
			/>
		))}
		<button className="OrderButton" disabled={!props.purchasable} onClick={props.ordered}>
			ORDINA ADESSO
		</button>
	</div>
);

export default buildControls;
