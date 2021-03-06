import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }
        componentWillMount() {
            // clear error on request
            this.reqInterceptor = axios.interceptors.request.use(
                req => {
                    this.setState({ error: null})
                    return req;
                }
            )
            // set error on response
            this.resInterceptor = axios.interceptors.response.use(
                res => res,
                err => {
                    this.setState({
                        error: err
                    })
                }
            )
        }
        
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <Auxiliary>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
       
    }
}

export default withErrorHandler
 