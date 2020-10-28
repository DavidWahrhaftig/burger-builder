import React, { useState } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const closeSideDrawer = () => {
        // this.setState({
        //     showSideDrawer: false
        // })
        setShowSideDrawer(false);
    }

    const toggleSideDrawer = () => {
        // this.setState( ( prevState ) => {
        //     return {showSideDrawer: !prevState.SideDrawer}
        // });

        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Auxiliary>
            <Toolbar 
                toggleSideDrawer={toggleSideDrawer} 
                isAuthenticated={props.isAuthenticated}
            />
            <SideDrawer 
                show={showSideDrawer} 
                close={closeSideDrawer}
                isAuthenticated={props.isAuthenticated}
            />
            <main className={classes.Content}>{props.children}</main>
        </Auxiliary>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);

