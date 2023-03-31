import React, { FC } from 'react';
import { List, Container } from './style';

interface IUser {
    id: string;
    name: string;
}

interface IHits {
    id: string;
    hitsBhaskara: number;
    hitsPitagoras: number;
    hitsVelmedia: number;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
}

interface IProp {
    doc: IHits;
}

const HitQuestionsList: FC<IProp> = ({ doc }) => {
    return(
        <Container>
            <List>Id: {doc.id}</List>
            <List>Bhaskara: {doc.hitsBhaskara}</List>
            <List>Pitagoras: {doc.hitsPitagoras}</List>
            <List>Velmedia: {doc.hitsVelmedia}</List>
            <List>username: {doc.user.name}</List>
            <List>Criado em: {doc.createdAt}</List>
            <List>Atualizado em: {doc.updatedAt}</List>
        </Container>
    )
}

export default HitQuestionsList;