import React, { FC, useEffect, useState } from 'react';
import { Container, Title } from '../../style/globalStyle';

import api from '../../services/axios';
import ListRankHits from '../../components/ListRankHits';
import { IData } from '../../interfaces';

const RankPitagoras: FC = () => {

    const [data, setData] = useState<IData[]>([]);

    useEffect(() => {
        (async () => {
            const data = await api.get('/top/pitagoras');
            setTimeout(() => setData(data.data), 1000);
        })();
    }, []);

    return(
        <Container>
            <Title>Rank Pitagoras Acertos</Title>

            {data.length? 
                data.map((doc, index) => <ListRankHits 
                    key={doc.id} doc={doc} index={index} />
                ): 
                <p>...Loading</p>
            }
        </Container>
    )
}

export default RankPitagoras;