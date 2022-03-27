import {AuthAction, AuthState, AuthActionEnum} from "./type";
import {IUser} from "../../../models/IUser";

const initialState:AuthState = {
    isAuth: false,
    user:{} as IUser,
    error:""
}

const authReducer = (state = initialState, action:AuthAction):AuthState => {
    switch (action.type) {
        case AuthActionEnum.SET_AUTH:
            return {
                ...state,
                isAuth: action.payload
            };
        case AuthActionEnum.SET_USER:
            return {
                ...state,
                user:action.payload
            }
        case AuthActionEnum.SET_ERROR:
            return {
                ...state,
                error:action.payload
            }

        default:    return{...state}
    }
}

export default authReducer;