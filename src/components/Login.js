import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions/userActions'
import { useHistory } from 'react-router-dom'

function Login() {

    let history = useHistory()


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    return (
        <form>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Your Email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Your Password" name="password" />
            </div>
            <button
                type="button"
                className="sign-up"
                onClick={() => {
                    dispatch(login(username, password, history))
                }}
            >
                Log In
            </button>
        </form>
    )
}


export default Login