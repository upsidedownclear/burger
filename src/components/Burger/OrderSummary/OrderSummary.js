import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
			</li>
		);
	});

	return (
		<Aux>
			<h3>Il Tuo Ordine</h3>
			<p>
				<strong>Prezzo: {props.price.toFixed(2)} Euro</strong>
			</p>
			<p>Vai nel carrello?</p>
			<Button btnType="Danger" clicked={props.purchaseCancelled}>
				INDIETRO
			</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>
				CONTINUA
			</Button>
		</Aux>
	);
};

export default OrderSummary;
