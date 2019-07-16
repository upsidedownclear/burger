import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};

	componentDidMount() {
		axios
			.get('orders.json')
			.then((response) => {
				const tmp_array = [];
				for (let key in response.data) {
					tmp_array.push({
						...response.data[key],
						id: key
					});
				}
				this.setState({ orders: tmp_array, loading: false });
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			<div>
				{this.state.orders.map((order) => {
					console.log('[Orders.js]', order);
					return <Order key={order.id} ingredients={order.ingredient} price={+order.price} />;
				})}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
