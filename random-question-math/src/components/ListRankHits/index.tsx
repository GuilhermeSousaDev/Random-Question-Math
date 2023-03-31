import React, { FC } from 'react';
import { List, Container } from './style';

interface IUser {
    id: string;
    name: string;
}

interface IData {
    id: string;
    hitsBhaskara?: number;
    hitsPitagoras?: number;
    hitsVelmedia?: number;
    user: IUser;
    createdAt: Date;
}

interface IProp {
    doc: IData;
    index: number;
}

const ListRankHits: FC<IProp> = ({ doc, index }) => {
    return(
        <Container>
            <div>
                <p>{index + 1} -</p>
                <List>nome: {doc.user.name}</List>
                <List>Acertos: {doc.hitsPitagoras || doc.hitsBhaskara || doc.hitsVelmedia || 0}</List>
                <List>Id: {doc.id}</List>
                <List>Criado em: {new Date(doc.createdAt).toLocaleDateString()}</List>
            </div>
        </Container>
    )
}

export default ListRankHits;