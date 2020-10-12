import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axiosOrders.get('https://react-burger-builder-7d7ed.firebaseio.com/ingredients.json')
            .then(res => {
                console.log(res.data);
                this.setState({
                    ingredients: res.data
                });
            }).catch(error => {
                console.log(error);
                this.setState({error: true})
            })
    }

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
        this.setState({
            purchaseable: sum > 0
        });
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) +  '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&')
        
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'David Wahrhaftig',
        //         address: {
        //             street: 'Test street 1',
        //             zipCode: '12345',
        //             country: 'Canada'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // this.setState({
        //     loading: true
        // });

        // setTimeout(() => {
        //     axiosOrders.post('/orders.json', order)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({
        //             purchasing: false,
        //             loading: false
        //         })
        //     }).catch(error => {
        //         console.log(error);
        //         this.setState({
        //             purchasing: false,
        //             loading: false
        //         })
        //     });
        // }, 3000);
        // add .json to endpoint for firebase
        
    }

    render() {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
            
        if (this.state.ingredients) {
            burger = 
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        add={this.addIngredientHandler} 
                        remove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}/>
                </Auxiliary>;

             orderSummary = 
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.state.totalPrice.toFixed(2)}
                />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>

                    {orderSummary}
                    
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axiosOrders);
