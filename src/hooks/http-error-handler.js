import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    // instead of componentWillUnmount()

    const reqInterceptor = httpClient.interceptors.request.use(
        req => {
            setError(null);
            return req;
        }
    );

    // set error on response
    const resInterceptor = httpClient.interceptors.response.use(
        res => res,
        err => {
            // this.setState({
            //     error: err
            // })
            setError(err);
        }
    );
    
    // instead of componentWillUnmount() 
    useEffect(() => {
        // clean up function
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.request.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor, httpClient]);
        

    const errorConfirmedHandler = () => {
        // this.setState({
        //     error: null
        // });
        setError(null);
    }

    return [error, errorConfirmedHandler];
}