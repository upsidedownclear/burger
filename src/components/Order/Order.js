import React from 'react';
import './Order.css';

const Order = (props) => {
	const ingredients = [];
	console.log('[Order.js] props', props);

	for (let key in props.ingredients) {
		console.log('[Order.js] loop', key);
		ingredients.push({ name: key, amount: props.ingredients[key] });
	}
	const ingredientToRender = ingredients.map((el) => (
		<li style={{ textTransform: 'capitalize' }}>
			{el.name} ({el.amount})
		</li>
	));
	console.log('[Order.js] ingredients', ingredients);
	return (
		<div className="Order">
			<ul>{ingredientToRender}</ul>
			<p>
				Prezzo <strong>Euro {props.price.toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default Order;
