import * as c from '../constants/userConstants'
import Axios from 'axios'
import localStorage from 'localStorage'

const signup = (username, password, history) => (dispatch) => {
    dispatch({ type: c.SIGNUP_REQUEST })
    Axios({
        method: "POST",
        url: "/users/signup",
        data: {
            username: username,
            password: password
        }
    })
        .then(res => {
            if (res.error) {
                dispatch({ type: c.SIGNUP_ERROR, payload: res.message })
            } else {
                dispatch({ type: c.SIGNUP_SUCCESS })
                history.push("/login")
            }
        }).catch(err => dispatch({ type: c.SIGNUP_ERROR, payload: err }))
}

const login = (username, password, history) => (dispatch) => {
    dispatch({type: c.LOGIN_REQUEST})
    Axios({
        method: "POST",
        url: "/users/login",
        data: {
            username: username,
            password: password,
        }
    })
    .then(res => {
        if(res.error) {
            dispatch({type: c.LOGIN_ERROR})
        } else {
            dispatch({type: c.LOGIN_SUCCESS, payload: res.data.user})
            let user = res.data.user
            localStorage.setItem('user', JSON.stringify(user))
            history.push("/")
        }
    }).catch(err => dispatch({ type: c.LOGIN_ERROR, payload: err }))
}

export {
    signup,
    login
}