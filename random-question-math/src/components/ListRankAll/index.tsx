import React, { FC } from 'react';
import { Container, List } from '../ListRankHits/style';

interface IData {
    id: string;
    hits: number;
    user: string;
    userId: string;
    createdAt: Date;
}

interface IProp {
    doc: IData;
    index: number;
}

const ListRankAll: FC<IProp> = ({ doc, index }) => {
    return(
        <Container>
            <div>
                <p>{index + 1} -</p>
                <List>nome: {doc.user}</List>
                <List>Total Acertos: {doc.hits}</List>
                <List>Id: {doc.id}</List>
                <List>Criado em: {new Date(doc.createdAt).toLocaleDateString()}</List>
            </div>
        </Container>
    )
}

export default ListRankAll;