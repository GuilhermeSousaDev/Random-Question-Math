import React, { 
    FC,
    useState,
    useEffect,
} from 'react';
import ListRankAll from '../../components/ListRankAll';
import api from '../../services/axios';
import { Title, Container } from '../../style/globalStyle';

interface IHits {
    id: string;
    hits: number;
    user: string;
    userId: string;
    createdAt: Date;
}

const RankAll: FC = () => {
    const [hits, setHits] = useState<IHits[]>();

    useEffect(() => {
        (async () => {
            const { data } = await api.get<IHits[]>('/top/all');

            setHits(data);
        })();
    }, []);

    return(
        <Container>
            <Title>Ranks</Title>
            
            {hits? 
                hits.map((doc, index) => 
                    <ListRankAll key={doc.id} doc={doc} index={index} />
                ) : <p>...Loading</p>
            }
        </Container>
    )
}

export default RankAll;