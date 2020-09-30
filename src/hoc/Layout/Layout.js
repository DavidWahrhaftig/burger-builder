import React, { Component } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar toggleSideDrawer={this.toggleSideDrawer}/>
                <SideDrawer 
                    show={this.state.showSideDrawer} 
                    close={this.closeSideDrawer}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary>
        );
    }
}
export default Layout;

