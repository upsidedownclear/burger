import React from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {
	state = {
		orderFrom: {
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
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let id in this.state.orderFrom) {
			formData[id] = this.state.orderFrom[id].value;
		}
		console.log('[ContactData.js][OrderHandler]', formData);
		const order = {
			ingredient: this.props.ingredients,
			price: this.props.price,
			orderData: formData
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

	inputChangedHandler = (event, inputId) => {
		const updatedOrderForm = {
			...this.state.orderFrom
		};
		const updatedFromElement = { ...updatedOrderForm[inputId] };
		updatedFromElement.value = event.target.value;
		updatedOrderForm[inputId] = updatedFromElement;

		// Non funziona con il setState senza il this.state diretto...
		this.setState({ orderForm: updatedOrderForm });
		this.state.orderFrom = updatedOrderForm;
		console.log('state', this.state);
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderFrom) {
			formElementsArray.push({
				id: key,
				config: this.state.orderFrom[key]
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{/* <Input elementType="..." elementConfig="..." value="..." /> */}
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						value={formElement.config.value}
						elementConfig={formElement.config.elementConfig}
						elementType={formElement.config.elementType}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
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
