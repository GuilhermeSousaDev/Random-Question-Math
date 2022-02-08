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
    transiton: 1s all ease-in-out;
    button {
        margin-bottom: 10px;
        margin-top: 10px;
    }
`;