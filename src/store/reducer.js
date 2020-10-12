import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: {
        meat: 0,
        salad: 0,
        cheese: 0,
        bacon: 0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: 
            // expect ingredient name in action
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                    
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        
        case actionTypes.REMOVE_INGREDIENT: 
            let newCount = state.ingredients[action.ingredientName];
            let newPrice = state.totalPrice
            
            if (newCount > 0) {
                newCount--;
                newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
            } else {
                return state;
            }
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: newCount,
                },
                totalPrice: newPrice
            };
            
        default: 
            return state;
    }
}

export default reducer;