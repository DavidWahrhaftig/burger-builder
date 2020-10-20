import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

// loading components lazyly 
const asyncBurgerBuilder = asyncComponent(() => import('./containers/BurgerBuilder/BurgerBuilder') );
const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout') );
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders') );
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth') );
const asyncLogout = asyncComponent(() => import('./containers/Auth/Logout/Logout') );

class App extends Component {
    
    componentDidMount() {
        this.props.onTryAuthSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" exact component={asyncBurgerBuilder}/>
                {/* For any unknown routes, redirect to '/' */}
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout}/>
                    <Route path="/orders" component={asyncOrders}/>
                    <Route path="/logout" component={asyncLogout}/>
                    <Route path="/auth" component={asyncAuth}/>
                    <Route path="/" exact component={asyncBurgerBuilder}/>
                    {/* For any unknown routes, redirect to '/' */}
                    <Redirect to="/"/>
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAuthSignup: () => dispatch(authActions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
