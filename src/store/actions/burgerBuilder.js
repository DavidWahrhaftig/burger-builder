import * as actionTypes from './actionTypes';
import axiosOrders from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

// asynchronous action
export const initIngredients = () => {
    return dispatch => {
        axiosOrders.get('https://react-burger-builder-7d7ed.firebaseio.com/ingredients.json')
            .then(res => {
                // console.log(res.data);
                dispatch(setIngredients(res.data));
            }).catch(error => {
                // console.log(error);
                // this.setState({error: true})
                dispatch(fetchIngredientsFailed())
            })
    };
};