import React, { useEffect, useState, FC } from 'react';
import HitQuestionsList from '../../components/HitsQuestionsList';
import api from '../../services/axios';

interface IHits {
    id: string;
    hitsBhaskara: number;
    hitsPitagoras: number;
    hitsVelmedia: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const Home: FC = () => {

    const [hits, setHits] = useState<IHits[]>([]);

    useEffect(() => {
        (async () => {
            const data = await api.get('/question/hits')
    
            setTimeout(() => setHits(data.data), 1000);

        })();
    }, [hits]);

    return(
        <>
            <h1>Home</h1>
                {hits.length? 
                    hits.map(doc => <HitQuestionsList key={doc.id} doc={doc} />) 
                    : 
                    <p>...Loading</p>
                }
        </>
    )
}

export default Home;