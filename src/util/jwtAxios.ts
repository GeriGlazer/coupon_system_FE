
import axios from 'axios';
import { updateToken } from '../redux/authState';
import { store } from '../redux/store';

const jwtAxios = axios.create();


//Request interceptor - מה אנחנו רוצים לבצע בכל שליחת בקשה לשרת
jwtAxios.interceptors.request.use(request=>{
    request.headers = {
        "authorization" : store.getState().AuthState.userToken
    };
    //we must continue the delivery to the server
    return request;
});

jwtAxios.interceptors.response.use((response)=>{
    store.dispatch(updateToken(response.headers.authorization));
    return response;
})

export default jwtAxios;