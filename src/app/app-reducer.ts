import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "../features/auth/auth-reducer";
import {ResultCodes} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await  authAPI.me()
        if(res.data.resultCode===ResultCodes.Succeeded) {
            dispatch(setIsLoggedInAC(true));
        } else {
            // handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch)
    }
    // authAPI.me().then(res => {
    //     debugger
    //     if (res.data.resultCode === 0) {
    //         dispatch(setIsLoggedInAC(true));
    //     } else {
    //     }
    // }
    // )
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
