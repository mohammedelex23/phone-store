import styled from 'styled-components'

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    font-size: 1.4rem;
    background: transparent;
    border: 0.05rem solid var(--lightBlue);
    color: ${props => props.inCart ? "var(--mainYellow)" : "var(--lightBlue)"};
    border-radius: 0.5rem;
    border-color: ${props => props.inCart ? "var(--mainYellow)": "var(--lightBlue)"};
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
        background: ${props => props.inCart ? "var(--mainYellow)" : "var(--lightBlue)"};
        color: var(--mainBlue);
    }
    &:focus {
        outline: none;
    }
`;