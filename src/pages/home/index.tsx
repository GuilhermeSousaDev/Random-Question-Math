import React, { useEffect, useState } from 'react';
import api from '../../services/axios';

interface IHits {
    id: string;
    hitsBhaskara: number;
    hitsPitagoras: number;
    hitsVelmedia: number;
    userId: string;
}

const Home: React.FC = () => {

    const [hits, setHits] = useState<IHits[]>();

    useEffect(() => {
        api.get('/question/hits')
            .then(data => setHits(data.data))
    }, []);

    return(
        <>
            {
                hits && hits.map(doc => {
                    <h1>{doc.userId}</h1>
                })
            }
        </>
    )
}

export default Home;