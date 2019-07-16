import React from 'react';
import './Order.css';

class Order extends React.Component {
	render() {
		const ingredients = [];
		console.log('[Order.js] props', this.props);

		for (let key in this.props.ingredients) {
			console.log('[Order.js] loop', key);
			ingredients.push({ name: key, amount: this.props.ingredients[key] });
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
					Prezzo <strong>Euro {this.props.price.toFixed(2)}</strong>
				</p>
			</div>
		);
	}
}

export default Order;
