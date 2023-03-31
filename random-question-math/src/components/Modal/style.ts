import styled from 'styled-components';

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
    width: 300px;
    height: 300px;
    border-color: black;
    background-color: white;
    color: black;
    border-radius: 20px;
    margin-top: 20px;
    transition: 1s all ease-in-out;
    button {
        margin-bottom: 10px;
        margin-top: 10px;
    }
`;

export const Account = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
    width: 600px;
    height: 500px;
    border-color: 5px solid #dc3545;
    background-color: white;
    color: black;
    border-radius: 20px;
    margin-top: 20px;
    transition: 1s all ease-in-out;
    button {
        margin-bottom: 10px;
        margin-top: 10px;
        margin-left: 15px;
    }
`;

export const Warning = styled.h1`
    color: #000;
    background-color: #dc3545;
    padding: 0.75rem;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    p {
        text-align: center;
        font-family: 'Spline Sans', sans-serif;
    }
`;