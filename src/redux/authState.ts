
import jwt_decode from "jwt-decode"

export class AuthState{
    userEmail  : string = "";
    userType  : string = "";
    userToken : string = "";
}

export enum AuthActionType{
    LoginUser = "LoginUser",
    LogoutUser = "LogOutUser",
    UpdateToken = "UpdateToken",
}

export interface AuthAction{
    type: AuthActionType,
    payload?: any,
}

export function loginUser(userToken: string):AuthAction{
return {type:AuthActionType.LoginUser, payload: userToken}
}

export function logOutUser():AuthAction{
    return {type: AuthActionType.LogoutUser}
}

export function updateToken(userToken: string):AuthAction{
    return{type: AuthActionType.UpdateToken, payload: userToken}
}

export function AuthReducer (currentState: AuthState = new AuthState, action: AuthAction):AuthState{
    const newState = {...currentState};

    switch(action.type){
        case AuthActionType.LoginUser:
            var token = action.payload.replace("Bearer ", "");
            var decode = JSON.parse(JSON.stringify(jwt_decode(token)));
            newState.userToken = action.payload;
            newState.userEmail = decode.userEmail;
            newState.userType = decode.sub;
        break;

        case AuthActionType.LogoutUser:
            newState.userToken = "";
            newState.userEmail = "";
            newState.userType = "";
        break;

        case AuthActionType.UpdateToken:
            newState.userToken = action.payload;
        break;
    }

   return newState;

    

}