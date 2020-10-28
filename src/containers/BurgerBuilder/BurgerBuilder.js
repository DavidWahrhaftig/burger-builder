import React, { useState, useEffect, useCallback } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false)

    const dispatch = useDispatch();
    const ings = useSelector(state => state.burgerBuilder.ingredients)
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice)
    const error = useSelector(state => state.burgerBuilder.error)
    const isAuthenticated = useSelector(state => state.auth.token !== null)


    const addIngredient = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const removeIngredient = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const initIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));


    // const {initIngredients} = props;
    // instead of componentDidMount
    useEffect(() => {
        initIngredients();
    }, [initIngredients])

    // const addIngredientHandler = (type) => {
    //     const oldCount = props.ings[type];
    //     const updatedCount = oldCount + 1;
        
    //     let updatedIngredients = {...props.ings}
    //     updatedIngredients[type] = updatedCount;
        
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = props.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
        

    //     // this.setState({
    //     //     ingredients: updatedIngredients,
    //     //     totalPrice: newPrice
    //     // })

    //     updatePurchaseState(updatedIngredients);
    // }
    
    // const removeIngredientHandler = (type) => {
        
    //     if(props.ings[type] === 0) {
    //         return;
    //     }
    //     let updatedIngredients = {...props.ings}
        
    //     updatedIngredients[type] -= 1;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = props.totalPrice;
    //     let newPrice = oldPrice - priceDeduction;

        
    //     // this.setState({
    //     //     ingredients: updatedIngredients,
    //     //     totalPrice: newPrice
    //     // })

    //     updatePurchaseState(updatedIngredients);
    // }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => sum += el, 0);
        // console.log(sum);    
        return  sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            // setState({
            //     purchasing: true
            // });
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
        
    }

    const purchaseCancelHandler = () => {
        // this.setState({
        //     purchasing: false
        // });
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) +  '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);

        // const queryString = queryParams.join('&')
        onInitPurchase();
        props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        });
    }

    const disabledInfo ={
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        
    if (ings) {
        burger = 
            <Auxiliary>
                <Burger ingredients={ings}/>
                <BuildControls 
                    add={addIngredient} 
                    remove={removeIngredient}
                    disabled={disabledInfo}
                    price={totalPrice}
                    purchaseable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuthenticated={isAuthenticated}/>
            </Auxiliary>;

            orderSummary = 
            <OrderSummary 
                ingredients={ings}
                purchaseCancel={purchaseCancelHandler}
                purchaseContinue={purchaseContinueHandler}
                price={totalPrice.toFixed(2)}
            />;
    }

    // if (this.state.loading) {
    //     orderSummary = <Spinner/>;
    // }

    return (
        <Auxiliary>
            <Modal 
                show={purchasing} 
                modalClosed={purchaseCancelHandler}>
                    {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    )
}

// ---------------- REDUX CONFIGURATION  ---------------- 
// const mapStateToProps = (state) => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         totalPrice: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//      }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
//         removeIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
//         initIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrders));
export default withErrorHandler(BurgerBuilder, axiosOrders);
