import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	// This could be a functional component, doesn't have to be a class
	componentWillUpdate() {
		console.log('[OrderSummary] WillUpdate');
	}

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
				</li>
			);
		});

		return (
			<Aux>
				<h3>Il Tuo Ordine</h3>
				{/* <p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul> */}
				<p>
					<strong>Prezzo: {this.props.price.toFixed(2)} Euro</strong>
				</p>
				<p>Vai nel carrello?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>
					INDIETRO
				</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>
					CONTINUA
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;
