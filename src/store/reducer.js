import * as actionTypes from './actions';

const initState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0
	},
	totalPrice: 0.5 + 0.5 + 1.3 + 0.7
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.ADD_IGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				}
			};
		case actionTypes.REMOVE_IGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				}
			};
		default:
			return state;
	}
};

export default reducer;
