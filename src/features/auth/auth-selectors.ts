import {AppRootStateType} from "../../app/store";

export const authSelectors = (state: AppRootStateType)=> state.auth.isLoggedIn