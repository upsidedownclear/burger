import React from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import './ContactData.css';

import axios from '../../../axios-order';

class ContactData extends React.Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		console.log(this.props);
		this.setState({ loading: true });
		const order = {
			ingredient: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Mario Rossi',
				address: {
					street: 'test',
					zipcode: '1234',
					country: 'Gemany'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
		};
		console.log('[ContactData.js] order: ', order);
		axios
			.post('/orders.json', order) // any name of choice,  example ciao.json
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((erorr) => {
				this.setState({ loading: false });
			});
	};

	render() {
		let form = (
			<form>
				<input type="text" name="name" placeholder="Nome" />
				<br />
				<input type="text" name="mzil" placeholder="Mail" />
				<br />
				<input type="text" name="indirizzo" placeholder="Indirizzo di consegna" />
				<br />
				<Button btnType="Success" clicked={this.orderHandler}>
					Ordina
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className="ContactData">
				<h4>Inserisci dati per la spedizione</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
