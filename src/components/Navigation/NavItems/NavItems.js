import React from 'react'
import NavItem from './NavItem/NavItem'
import classes from './NavItems.module.css'

const NavItems = props => (
    <ul className={classes.NavItems}>
        <NavItem link="/">Burger Builder</NavItem>
        {props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null}
        {props.isAuthenticated 
            ? <NavItem link="/logout">Logout</NavItem>
            : <NavItem link="/auth">Authenticate</NavItem>}
    </ul>
)


export default NavItems;
