import { Button } from '@mui/material'
import React from 'react'
import "./Login.css"
import {auth, provider} from "../firebase"
import {useStateValue} from "../StateProvider"
import { actionTypes } from '../Reducer'



function Login() {
    const [{},dispatch] = useStateValue();

    const signIn = ()=>{
        auth.signInWithPopup(provider)
            .then(result=>(
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            )).catch(err=> alert(err.message))
    }


    return (
        <div className='login'>
        <div className='login--container'>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="whatsapp logo"
            />
            <div className='login--text'>
                <h1>Sign in to Whatsapp</h1>
            </div>

            <Button onClick={signIn}>
                Sign In With Google
            </Button>
        </div>
        </div>
    )
}

export default Login
