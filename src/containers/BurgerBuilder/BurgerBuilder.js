import React, { useState, useEffect } from 'react';

import axios from '../../axios-order';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

const BurgerBuilder = (props) => {
	const [ ingredients, setIngredients ] = useState(null);
	const [ totalPrice, setTotalPrice ] = useState(1);
	const [ purchasable, setPurchasable ] = useState(false);
	const [ purchasing, setPurchasing ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		axios
			.get('https://burger-react-playground.firebaseio.com/ingredients.json')
			.then((response) => {
				setIngredients(response.data);
			})
			.catch((err) => {
				setError(err);
			});
	}, []);

	const updatePurchaseState = (ing) => {
		const sum = Object.keys(ing)
			.map((igKey) => {
				return ing[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		setPurchasable(sum > 0);
	};

	const addIngredientHandler = (type) => {
		const oldCount = ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = totalPrice;
		const newPrice = oldPrice + priceAddition;

		setTotalPrice(newPrice);
		setIngredients(updatedIngredients);
		updatePurchaseState(updatedIngredients);
	};

	const removeIngredientHandler = (type) => {
		const oldCount = ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = totalPrice;
		const newPrice = oldPrice - priceDeduction;
		setTotalPrice(newPrice);
		setIngredients(updatedIngredients);
		updatePurchaseState(updatedIngredients);
	};

	const purchaseHandler = () => {
		setPurchasing(true);
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		const queryParams = [];
		for (let i in ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
		}
		queryParams.push('price=' + totalPrice);

		const queryString = queryParams.join('&');
		props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	};

	const disabledInfo = {
		...ingredients
	};
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}
	let orderSummary = null;
	let burger = error ? <p>Errore durante caricamento ingredienti</p> : <Spinner />;
	if (ingredients) {
		burger = (
			<Aux>
				<Burger ingredients={ingredients} />
				<BuildControls
					ingredientAdded={addIngredientHandler}
					ingredientRemoved={removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={purchasable}
					ordered={purchaseHandler}
					price={totalPrice}
				/>
			</Aux>
		);
		orderSummary = (
			<OrderSummary
				ingredients={ingredients}
				price={totalPrice}
				purchaseCancelled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
			/>
		);
	}
	if (loading) {
		orderSummary = <Spinner />;
	}
	return (
		<Aux>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);
};

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_IGREDIENT, ingredientName: ingName }),
		onIngredientRemove: (ingName) => dispatch({ type: actionTypes.REMOVE_IGREDIENT, ingredientName: ingName })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
