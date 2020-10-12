import axios from 'axios';

let instance =  axios.create({
    baseURL: 'https://react-burger-builder-7d7ed.firebaseio.com/'
});

export default instance;
