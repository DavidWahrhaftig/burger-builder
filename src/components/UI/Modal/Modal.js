import React, {Component} from 'react'
import classes from './Modal.module.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

const Modal = props => {
    // Performance fix, to not uneccessarily render the modal and its components
    // const shouldComponentUpdate(nextProps, nextState) {
    //     // only update when showing or hiding the modal
    //     return nextProps.show !== props.show || nextProps.children !== props.children;
    // }



    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                    
                }}>
                {props.children}
            </div>
        </Auxiliary>
        );
}

export default React.memo(Modal, 
    (prevProps, nextProps) => 
        nextProps.show == prevProps.show &&
        nextProps.children == prevProps.children
);
// React memo makes this component update only when one of its props changes
