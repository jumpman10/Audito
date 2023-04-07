import { UserData } from "../../interfaces/auhtInterface";


export interface AuthState {
    errorMessaje : string,
    userId: string | null,
    user: UserData | null,
    status: 'checking' | 'authenticated' | 'not-authenticated',
}


type AuhtAction =  
    
    | { type: 'singIn', payload : {userId:string , user:UserData} }
    | { type: 'addError', payload:string}
    | { type: 'removeError'}
    | { type: 'notAuthenticated'}
    | {type: 'logOut'}




export const authReducer = (state : AuthState, action : AuhtAction ): AuthState =>{

    switch (action.type) {
        case 'addError':
            return{
                ...state,
                user: null,
                userId: null,
                status: 'not-authenticated',
                errorMessaje: action.payload
            }
        case 'removeError':
            return{
                ...state,
                errorMessaje: ''
            }
        case 'singIn':
            return{
                ...state,
                errorMessaje: '',
                status: 'authenticated',
                userId: action.payload.userId,
                user: action.payload.user
            }
        case 'logOut':
        case 'notAuthenticated':
            return{
                ...state,
                status: 'not-authenticated',
                userId: null,
                user: null,
            }
        
  
    
        default:
            return state
    }
}