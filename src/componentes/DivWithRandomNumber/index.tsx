import React, { 
    useState, 
    useEffect,
    FC
} from 'react';

interface IProp {
    max: number;
}

const DivWithRandomNumber: FC<IProp> = ({ max }) => {

    const [num, setNum] = useState<number>();

    useEffect(() => {
        setNum(Math.floor(Math.random() * max))
    }, [max]);

    return(
        <>
            <div className='randomNumber'>
                {num}
            </div>
        </>
    );
}

export default DivWithRandomNumber;