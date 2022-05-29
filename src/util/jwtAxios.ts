import axios from 'axios';

const jwtAxios = axios.create();

//Request interceptor - מה אנחנו רוצים לבצע בכל שליחת בקשה לשרת
jwtAxios.interceptors.request.use(request=>{
    request.headers = {
        "authorization" : localStorage.getItem("jwt")
    };
    //we must continue the delivery to the server
    return request;
});

jwtAxios.interceptors.response.use(response=>{
     localStorage.setItem("jwt", response.headers.authorization);
    //we must continue the delivery to the client
    return response;
});


export default jwtAxios;