import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authState';
import { store } from '../redux/store';

const jwtAxios = axios.create();

//Request interceptor - מה אנחנו רוצים לבצע בכל שליחת בקשה לשרת
jwtAxios.interceptors.request.use(request=>{
    request.headers = {
        "authorization" : store.getState().userToken
    };
    //we must continue the delivery to the server
    return request;
});

export default jwtAxios;