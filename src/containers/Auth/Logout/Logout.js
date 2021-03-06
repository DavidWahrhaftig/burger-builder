import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as authActions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';

export class Logout extends Component {
    
    componentDidMount() {
        this.props.onLogout();
    }
    render() {
        return <Redirect to="/auth" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authActions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
