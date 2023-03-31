import styled from 'styled-components';

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem;
    background: black;
    margin-top: 4px;
    border-radius: 20px;
    h3 {
        font-family: 'Teko', sans-serif;
        font-size: 30px;
        letter-spacing: 5px;
        background-color: #343a40;
        border-radius: 10px;
        padding: 0 5px 0px 5px;
    }
    a {
        text-decoration: none;
        padding: 0.3rem;
        color: #17a2b8;
    }
`;
export const Links = styled.div`
    a:nth-child(2) {
        margin-left: 35px;
        margin-right: 10px;
        width: 35px;
        height: 35px;
    }
    a {
        img {
            width: 30px;
            height: 30px;
        }
    }
`;

export const GlobalButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
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
    a {
        text-decoration: none;
        color: black;
    }
`;