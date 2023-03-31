import styled from 'styled-components';

export const List = styled.ul`
    padding: 10px;
    border: 1px solid black;
    list-style-type: none;
    margin-bottom: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    li {
        padding: 10px;
    }

    img {
        width: 30px;
        height: 30px;
    }
`;

export const LiImage = styled.li`
    cursor: pointer;
`;

export const Button = styled.button`
    display: inline-block;
    background-color: ${(props) => props.color};
    border-color: #343a40;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
`;