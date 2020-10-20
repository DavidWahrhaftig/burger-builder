import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axiosOrders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as orderActions from '../../store/actions/index';

export class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = this.props.orders.map(order => {
            return <Order 
                        key={order.id} 
                        ingredients={order.ingredients} 
                        price={order.price}/>
        });
        if (this.props.loading) {
            orders = <Spinner/>
        }

        return orders;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(orderActions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrders));
