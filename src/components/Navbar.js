import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg'
import styled from 'styled-components'
import { ButtonContainer } from './Button'
import localStorage from 'localStorage'
import { useSelector } from 'react-redux';



function Navbar(props) {

    const [username, setUser] = useState({})
    const userReducer = useSelector(state => state.user)
    const { user } = userReducer

    useEffect(() => {
        const username = JSON.parse(localStorage.getItem('user'))
        setUser(username)
    }, [user])


    return (
        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5" >
            {/* https://www.iconfinder.com/icons/1243689/call_phone_icon
Creative Commons (Attribution 3.0 Unported);
https://www.iconfinder.com/Makoto_msk */}
            {/* Navbar Brand */}
            <Link to="/" className="navbar-brand">
                <img src={logo} alt="store" className="mr-5" />
                <span>Products</span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav align-items-sm-center ml-auto">
                    <li className="nav-item mr-2">
                        {
                            username ? <Link className="nav-link" to="/cart">
                                <ButtonContainer>
                                    <span className="mr-2">
                                        <i className="fas fa-cart-plus"></i>
                                    </span>
                                my cart
                            </ButtonContainer>
                            </Link> :
                                <div></div>
                        }
                    </li>
                    <li className="nav-item">
                        {
                            username ? <div className="profile">
                                <div>
                                    <i className="fas fa-user-circle ml-2" style={{ color: "#ffffff", fontSize: "1.5rem" }} aria-hidden="true"></i>
                                    <p>hi {username.username}</p>
                                </div>
                            </div> :
                                <Link className="nav-link" to="/signup">
                                    <button className="user-actions signup">Sign Up</button>
                                </Link>
                        }
                    </li>
                    <li className="nav-item">
                        {
                            username ? <div></div> :
                                <Link className="nav-link" to="/login">
                                    <button className="user-actions login">Log In</button>
                                </Link>
                        }
                    </li>
                </ul>
            </div>
        </NavWrapper>
    )
}

const NavWrapper = styled.nav`
    background: var(--mainBlue);
    // .nav-leink {
    //     color: var(--mainWhite) !important;
    //     font-size: 1.1rem;
    //     text-transform: capitalize;
    // }
`;


export default Navbar
