import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
	return (
		<div className="CheckoutSummary">
			<div
				style={{
					width: '100%',
					margin: 'auto',
					textAlign: 'center'
				}}
			>
				<h1>Il Tuo Panino</h1>
				<Burger ingredients={props.ingredients} />
				<Button btnType="Danger" clicked={props.checkoutCancelled}>
					CANCEL
				</Button>
				<Button btnType="Success" clicked={props.checkoutContinue}>
					CONTINUE
				</Button>
			</div>
		</div>
	);
};

export default CheckoutSummary;
