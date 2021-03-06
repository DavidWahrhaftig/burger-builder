import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggleSideDrawer}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuthenticated}/>
        </nav>
    </header>
)

export default Toolbar;
