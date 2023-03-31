import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #17a2b8;
    border-radius: 20px;
    margin-top: 10px;
    padding-bottom: 10px;
    p {
        font-size: 20px;
    }
    div {
        font-size: 20px;
        letter-spacing: 1px;
        font-family: 'Spline Sans', sans-serif;
    }
    h4 {
        font-size: 20px;
        margin-top: 5px;
        margin-bottom: 5px;
        letter-spacing: 2px;
    }
    input {
        padding: 0.25rem;
        border-radius: 10px;
        border: 1px solid black;
        text-align: center;
    }
    span {
        font-size: 14px;
    }
`;
export const Title = styled.h1`
    color: #fff;
    background-color: #000;
    padding: 0.75rem;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    p {
        text-align: center;
        font-family: 'Spline Sans', sans-serif;
    }
`;
export const Response = styled.span`
    background: ${(props) => props.color};
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
`;
export const Span = styled.span`
    font-size: 20px;
    letter-spacing: 1px;
`;
export const Button = styled.button`
    display: inline-block;
    background-color: #007bff;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1.20rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    margin: 10px;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    cursor: pointer;
`;