import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    background-color: #17a2b8;
    border-radius: 20px;
    margin-top: 10px;
`;
export const Rank = styled.div`
    div {
        display: flex;
        flex-direction: column;
        a {
            text-decoration: none;
            background-color: #28a745;
            padding: 10px;
            border: 1px solid black;
            border-radius: 10px;
            margin-bottom: 5px;
            color: black
        }
        a:hover {
            background: #dc3545;
        }
    }
`;