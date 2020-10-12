import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount() {
    //     axiosOrders.get('https://react-burger-builder-7d7ed.firebaseio.com/ingredients.json')
    //         .then(res => {
    //             console.log(res.data);
    //             this.setState({
    //                 ingredients: res.data
    //             });
    //         }).catch(error => {
    //             console.log(error);
    //             this.setState({error: true})
    //         })
    // }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        
        let updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount;
        
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        
        if(this.state.ingredients[type] === 0) {
            return;
        }
        let updatedIngredients = {...this.state.ingredients}
        
        updatedIngredients[type] -= 1;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice = oldPrice - priceDeduction;

        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => sum += el, 0);
        // console.log(sum);    
        return  sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) +  '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);

        // const queryString = queryParams.join('&')
        
        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        });
    }

    render() {
        const disabledInfo ={
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
            
        if (this.props.ings) {
            burger = 
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        add={this.props.addIngredient} 
                        remove={this.props.removeIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}/>
                </Auxiliary>;

             orderSummary = 
                <OrderSummary 
                    ingredients={this.props.ings}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.props.totalPrice.toFixed(2)}
                />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Auxiliary>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}

// ---------------- REDUX CONFIGURATION  ---------------- 
const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
        removeIngredient: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrders));
