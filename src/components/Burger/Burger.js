import React from 'react'
import classes from './Burger.module.css'
import Ingredient from './Ingredient/Ingredient'
// import {withRouter} from 'react-router-dom';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return (<Ingredient key={igKey + i} type={igKey}/>)
            })
        }).reduce((arr, el) => { // flatten array
            return arr.concat(el);
        }, []);

    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {transformedIngredients}
            <Ingredient type="bread-bottom"/>
        </div>
    )
};

export default Burger;
