import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 600px;
    background-color: #17a2b8;
    border-radius: 20px;
    margin-top: 10px;
`;
export const Exercice = styled.div`
    display: none;
    div {
        display: flex;
        flex-direction: column;
    }
`;