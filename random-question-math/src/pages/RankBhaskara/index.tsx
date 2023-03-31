import React, { FC, useEffect, useState } from 'react';
import { Container, Title } from '../../style/globalStyle';

import api from '../../services/axios';
import ListRankHits from '../../components/ListRankHits';
import { IData } from '../../interfaces';

const RankBhaskara: FC = () => {

    const [data, setData] = useState<IData[]>([]);

    useEffect(() => {
        (async () => {
            const data = await api.get('/top/bhaskara');
            setTimeout(() => setData(data.data), 1000);
        })();
    }, []);

    return(
        <Container>
            <Title>Rank Bhaskara Acertos</Title>

            {data.length? 
                data.map((doc, index) => <ListRankHits 
                    key={doc.id} doc={doc} index={index} />
                ): 
                <p>...Loading</p>
            }
        </Container>
    )
}

export default RankBhaskara;