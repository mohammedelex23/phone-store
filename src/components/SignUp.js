import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signup } from '../redux/actions/userActions'
import { useHistory } from 'react-router-dom'

function SignUp(props) {

    let history = useHistory()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    return (
        <form>
            <h1 className="mb-3">Sign Up</h1>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Your Email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Your Password" name="password" />
            </div>
            <div className="form-group">
                <label htmlFor="repassword">Re Password</label>
                <input type="password" placeholder="Re Enter Password" name="repassword" rows={5} />
            </div>
            <button onClick={() => {
                dispatch(signup(username, password, history))
            }
            }
                type="button"
                className="sign-up"
            >
                Sign Up
            </button>
        </form>
    );
}

export default SignUp;