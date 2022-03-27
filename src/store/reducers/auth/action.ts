import {AuthActionEnum, SetAuthAction, SetErrorAction, SetUserAction} from "./type"
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import {getUser} from "../../../api/api"

const AuthActionCreators = {
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),

    login: (email: string, password: string) => async (dispath: AppDispatch) => {
        try {
            const user = await getUser(email, password);

            if (user) {

                const userId = String(user[0].id)
                localStorage.setItem("userId", userId)
                localStorage.setItem("auth", "true");
                localStorage.setItem("user", user[0].email);
                dispath(AuthActionCreators.setIsAuth(true));
                dispath(AuthActionCreators.setUser(user[0]))
            } else {
                localStorage.removeItem("auth");
                localStorage.removeItem("user");
                localStorage.removeItem("userId")
                dispath(AuthActionCreators.setError("Неверный пароль или логин"))
            }

        } catch (e) {
            localStorage.removeItem("auth");
            localStorage.removeItem("user");
            localStorage.removeItem("userId")
            dispath(AuthActionCreators.setError("Неверный пароль или логин"))

        }
    },

    logout: () => async (dispath: AppDispatch) => {
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        localStorage.removeItem("userId")
        dispath(AuthActionCreators.setIsAuth(false))
        dispath(AuthActionCreators.setUser({} as IUser));
    }


}

export default AuthActionCreators;