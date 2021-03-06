import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classes from './Ingredient.module.css';

class Ingredient extends Component{
    state = {
        ingredient: null
    }
    render() {
        switch (this.props.type) {
            case('bread-bottom'):
                this.ingredient = (<div className={classes.BreadBottom}></div>);
                break;
            case('bread-top'):
                this.ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>);
                break;
            case('meat'):
                this.ingredient = (
                    <div className={classes.Meat}></div>);
                break;
            case('cheese'):
                this.ingredient = (
                    <div className={classes.Cheese}></div>);
                break;
            case('salad'):
                this.ingredient = (
                    <div className={classes.Salad}></div>);
                break;
            case('bacon'):
                this.ingredient = (
                    <div className={classes.Bacon}></div>);
                break;
            default:
                this.ingredient = null
        }
        return this.ingredient;
    }   
}

Ingredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default Ingredient;
