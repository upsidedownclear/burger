import React, { useEffect, useState } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
	const [ ingredients, setIngredients ] = useState([]);
	const [ totalPrice, setTotalPrice ] = useState(0);

	useEffect(() => {
		const query = new URLSearchParams(props.location.search);
		const ing = {};
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = param[1];
			} else {
				ing[param[0]] = +param[1];
			}
		}
		setIngredients(ing);
		setTotalPrice(price);
	}, []);

	const checkoutCancelledHandler = () => {
		props.history.goBack();
	};

	const checkoutContinueHandler = () => {
		props.history.replace('/checkout/contact-data');
	};

	return (
		<div>
			<CheckoutSummary
				ingredients={ingredients}
				checkoutCancelled={checkoutCancelledHandler}
				checkoutContinue={checkoutContinueHandler}
			/>
			<Route
				path={props.match.path + '/contact-data'}
				render={(props) => <ContactData {...props} ingredients={ingredients} price={totalPrice} />}
			/>
		</div>
	);
};

export default Checkout;
