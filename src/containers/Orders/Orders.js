import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = () => {
	const [ orders, setOrder ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
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
				setLoading(false);
				setOrder(tmp_array);
			})
			.catch((err) => {
				setLoading(false);
			});
	}, []);
	return (
		<div>
			{orders.map((order) => {
				console.log('[Orders.js]', order);
				return <Order key={order.id} ingredients={order.ingredient} price={+order.price} />;
			})}
		</div>
	);
};

export default withErrorHandler(Orders, axios);
