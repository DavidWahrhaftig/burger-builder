import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxuiliary from '../../../hoc/Auxiliary/Auxiliary'

const SideDrawer = props => {
    return (
        <Auxuiliary>
            <Backdrop show={props.show} clicked={props.close}/>
            <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')} onClick={props.close}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
        </Auxuiliary>
    );
}


export default SideDrawer;
