import React, { useState, useEffect } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';

const ContactData = (props) => {
	const [ orderForm, setOrder ] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Nome'
			},
			value: ''
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Indirizzo'
			},
			value: ''
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Codice Postale'
			},
			value: ''
		},
		county: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Paese'
			},
			value: ''
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Email'
			},
			value: ''
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'fastest', displayValue: 'Veloce' },
					{ value: 'cheapest', displayValue: 'Economico' }
				],
				type: 'text',
				placeholder: 'Spedizione'
			},
			value: 'Veloce'
		}
	});
	const [ loading, setLoading ] = useState(false);

	const orderHandler = (event) => {
		event.preventDefault();
		setLoading(true);
		const formData = {};
		for (let id in orderForm) {
			formData[id] = orderForm[id].value;
		}
		console.log('[ContactData.js][OrderHandler]', formData);
		const order = {
			ingredient: props.ingredients,
			price: props.price,
			orderData: formData
		};
		console.log('[ContactData.js] order: ', order);
		axios
			.post('/orders.json', order) // any name of choice,  example ciao.json
			.then((response) => {
				setLoading(false);
				props.history.push('/');
			})
			.catch((erorr) => {
				setLoading(false);
			});
	};

	const inputChangedHandler = (event, inputId) => {
		const updatedOrderForm = {
			...orderForm
		};
		const updatedFromElement = { ...updatedOrderForm[inputId] };
		updatedFromElement.value = event.target.value;
		updatedOrderForm[inputId] = updatedFromElement;

		setOrder(updatedOrderForm);
	};

	const formElementsArray = [];
	for (let key in orderForm) {
		formElementsArray.push({
			id: key,
			config: orderForm[key]
		});
	}
	let form = (
		<form onSubmit={orderHandler}>
			{/* <Input elementType="..." elementConfig="..." value="..." /> */}
			{formElementsArray.map((formElement) => (
				<Input
					key={formElement.id}
					value={formElement.config.value}
					elementConfig={formElement.config.elementConfig}
					elementType={formElement.config.elementType}
					changed={(event) => inputChangedHandler(event, formElement.id)}
				/>
			))}
			<Button btnType="Success" clicked={orderHandler}>
				Ordina
			</Button>
		</form>
	);

	if (loading) {
		form = <Spinner />;
	}

	return (
		<div className="ContactData">
			<h4>Inserisci dati per la spedizione</h4>
			{form}
		</div>
	);
};

export default ContactData;
