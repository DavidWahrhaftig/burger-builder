import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import * as authActions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';

export const Logout = props => {
    
    // componentDidMount() {
    //     this.props.onLogout();
    // }

    const {onLogout} = props;

    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Redirect to="/auth" />

}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authActions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
