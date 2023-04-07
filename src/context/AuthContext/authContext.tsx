import axios from "axios";
import React, { createContext, useReducer,useEffect, useState } from "react";
import { LoginResponse, UserData, LoginData } from '../../interfaces/auhtInterface';
import { authReducer, AuthState } from "./authReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';



type AuthContextProps = {
    errorMessaje : string,
    userId: string | null,
    user:UserData | null,
    status: 'checking' | 'authenticated' | 'not-authenticated',
    singIn: () => void;
    logOut: () => void;
    removeError: () => void;
    edit:({name,phone,surname} : UserData) => void;
}

const authInitialState : AuthState = {
    status: 'checking',
    userId:null,
    user:null,
    errorMessaje:''
}

export const AuthContext = createContext( {} as AuthContextProps) ;



const url ='http://192.168.65.109:3001'


export const AuthProvider = ({children} : any) => {

    const [state, dispatch] = useReducer(authReducer,authInitialState)

    useEffect(() => {
        checkUserId();
    }, [])
    
    
    const checkUserId = async() =>{
        const userId = await AsyncStorage.getItem('userId');
        if(!userId) return dispatch({type:'notAuthenticated'})
        
        const resp = await axios.get(`${url}/user/${userId}`)

        dispatch({
            type: 'singIn',
            payload: {
                userId:resp.data.userId,
                user:resp.data.userData
            }
        })
        
    }
    
    const singIn = async() => {

        try {
            const resp = await axios.get('http://localhost:3001/users')
            console.log(resp)


        } catch (error) {
            console.log(error)
            dispatch({
                type:'addError',
                payload:'La contraseña o el mail enviado son incorrectos'
            })
        }
    } ;
    
    const edit = async({name,phone,surname} : UserData)=>{  
        
        const userId = await AsyncStorage.getItem('userId');
        try {
            const resp = await axios.put(`${url}/${userId}`,{name,phone,surname})   
        } catch (error) {
            console.log(error)
        }
        
    }
  

    
    const logOut= async() => {
        await AsyncStorage.removeItem('userId');
        dispatch({type:'logOut'})
    } ;
    
    const removeError= () => {
        dispatch({type:'removeError'})
    } ;
    
    return(

        <AuthContext.Provider value = {{
            ...state,
            singIn,
            logOut,
            removeError,
            edit,
        }}>
            
            { children }
        
        </AuthContext.Provider>
    )
}