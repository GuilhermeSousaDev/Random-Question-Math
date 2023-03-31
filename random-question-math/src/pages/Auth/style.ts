import styled from "styled-components";

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    transition: 1s ease-in-out;
    input {
        margin-bottom: 10px;
    }
`;
export const Error = styled.p`
    background: red;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 10px;
    transition: 1s ease-in-out;
`;
export const Msg = styled.p`
    background: green;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 10px;
    transition: 1s ease-in-out;
`;