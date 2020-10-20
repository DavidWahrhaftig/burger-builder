import React, { Component } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawer = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    toggleSideDrawer = () => {
        this.setState( ( prevState ) => {
            return {showSideDrawer: !prevState.SideDrawer}
        });
    }
    render() {
        return (
            <Auxiliary>
                <Toolbar 
                    toggleSideDrawer={this.toggleSideDrawer} 
                    isAuthenticated={this.props.isAuthenticated}
                />
                <SideDrawer 
                    show={this.state.showSideDrawer} 
                    close={this.closeSideDrawer}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);

