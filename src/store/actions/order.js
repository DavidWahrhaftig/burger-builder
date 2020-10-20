import * as actionTypes from './actionTypes';
import axiosOrders from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData

    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error

    }
}

// export const setOrders = (orders) => {
//     return {
//         type: actionTypes.SET_ORDERS,
//         orders
//     }
// }

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}


export const fetchOrdersFail = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        orders
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}


// asynchornous actions
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axiosOrders.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            }).catch(error => {
               dispatch(purchaseBurgerFail(error));
            });
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        console.log(queryParams);
        axiosOrders.get('/orders.json' + queryParams)
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key], 
                        id: key
                    });
                }  
                dispatch(fetchOrdersSuccess(fetchedOrders));
            }).catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    }
}


