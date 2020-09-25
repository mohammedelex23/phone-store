import * as c from '../constants/userConstants'

function userReducer(state = {}, action) {
    switch (action.type) {
        case c.SIGNUP_REQUEST:
            return { loading: true, error: null }
        case c.SIGNUP_SUCCESS:
            return { loading: false, error: null }
        case c.SIGNUP_ERROR:
            return { loading: false, error: action.payload }

        // Login
        case c.LOGIN_REQUEST:
            return { loading: true, error: null, user: {} }
        case c.LOGIN_SUCCESS:
            return { loading: false, error: null, user: action.payload }
        case c.LOGIN_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export default userReducer;