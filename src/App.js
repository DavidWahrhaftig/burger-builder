import React, {useEffect, Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from './store/actions/index';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

// loading components lazyly 
const BurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder') );
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout') );
const Orders = React.lazy(() => import('./containers/Orders/Orders') );
const Auth = React.lazy(() => import('./containers/Auth/Auth') );
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout') );

const App = props => {
    
    // instead of componentDidMount method
    const { onTryAutoSignup } = props;
    useEffect (() => {
        console.log('[App.js useEffect]')
        
        props.onTryAutoSignup();
    }, [onTryAutoSignup]);

    let routes = (
        <Switch>
            <Route path="/auth" render={(props) => <Auth {...props}/>}/>
            <Route path="/" exact component={BurgerBuilder}/>
            {/* For any unknown routes, redirect to '/' */}
            <Redirect to="/"/>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
                <Route path="/orders" render={(props) => <Orders {...props}/>}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" render={(props) => <Auth {...props}/>}/>
                <Route path="/" exact component={BurgerBuilder}/>
                {/* For any unknown routes, redirect to '/' */}
                <Redirect to="/"/>
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </Layout>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authActions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
