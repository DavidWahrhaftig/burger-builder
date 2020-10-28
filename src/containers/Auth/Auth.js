import React, { useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as authActions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

export const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touached: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touached: false
        },
    })
    const [isSignup, setIsSignup] = useState(true);

    // componentDidMount() {
    //     if (! this.props.building && this.props.authRedirectPath !== '/') {
    //         // reset path
    //         this.props.onSetAuthRedirectPath();
    //     }
    // }

    const {onSetAuthRedirectPath, building, authRedirectPath} = props;
    // instead of componentDidMount()
    useEffect(() => {
        if (! building && authRedirectPath !== '/') {
            // reset path
            onSetAuthRedirectPath();
        }

    }, [onSetAuthRedirectPath, building, authRedirectPath])

    

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })

        // this.setState({ controls: updatedControls });
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('submitHandler')
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        // this.setState(prevState => {
        //     return {isSignup: !prevState.isSignup}
        // });

        setIsSignup(!isSignup);
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push( {
            id: key,
            config: controls[key],
        })
    }

    let form = formElementsArray.map(formElement => (
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            valid={formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
        />
    ));

    if (props.loading) {
        form = <Spinner/>
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}                    
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler}>SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
}

// Redux config
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(authActions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
