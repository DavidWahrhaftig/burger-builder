import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axiosOrders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axiosOrders.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key], 
                        id: key
                    });
                }

                this.setState({
                    orders: fetchedOrders,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        let orders = this.state.orders.map(order => {
            return <Order 
                        key={order.id} 
                        ingredients={order.ingredients} 
                        price={order.price}/>
        });
        if (this.state.loading) {
            orders = <Spinner/>
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axiosOrders);
