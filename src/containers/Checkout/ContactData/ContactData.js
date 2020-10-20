import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axiosOrders from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as orderActions from '../../../store/actions/order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {updateObject, checkValidity} from '../../../shared/utility';

export class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touached: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touached: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touached: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touached: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touached: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue:'Fastest'},
                        {value: 'cheapest', displayValue:'Cheapest'},
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }
    
    orderHandler = (event) => {
        event.preventDefault(); // to prevent form from reloading page
        

        const formData = {};
        for( let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        })
        
        const updatedForm = updateObject(this.state.orderForm,{
            [inputIdentifier]: updatedFormElement
        });        
 
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedForm,
            formIsValid: formIsValid
        });
        
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push( {
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let orderForm = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        valid={formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        />
                ))}
                <Button btnType="Success" disabled={! this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            orderForm = <Spinner/>
        }

        return ( 
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {orderForm}
            </div>
        )
    }
}

// ---------------- REDUX CONFIGURATION  ---------------- 

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosOrders))
