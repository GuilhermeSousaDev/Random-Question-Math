import React, { FC } from 'react';
import { List, Container } from './style';

interface IData {
    id: string;
    hitsBhaskara?: number;
    hitsPitagoras?: number;
    hitsVelmedia?: number;
    userId: string;
    createdAt: Date;
}

interface IProp {
    doc: IData;
}

const ListRankHits: FC<IProp> = ({ doc }) => {
    return(
        <Container>
            <div>
                <List>Id: {doc.id}</List>
                <List>Acertos: {doc.hitsPitagoras || doc.hitsBhaskara || doc.hitsVelmedia}</List>
                <List>user_id: {doc.userId}</List>
                <List>Criado em: {doc.createdAt}</List>
            </div>
        </Container>
    )
}

export default ListRankHits;