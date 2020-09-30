import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey,i) => {
        return (
            <li key={igKey+i}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
            </li>
        )
    });
    return (
        <Auxiliary>
            <h3>Your Order:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: {props.price}</p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Auxiliary>
    )
}

export default OrderSummary;
