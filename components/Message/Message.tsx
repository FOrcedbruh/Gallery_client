'use client'
import styles from './Message.module.css';
import { useState, useEffect } from 'react';


interface MessagePropstype {
    text: string
}


const Message: React.FC<MessagePropstype> = ({text}) => {

    const [flag, setFlag] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setFlag(true), 100);
    }, []);


    return (
        <article className={styles.main} style={{'opacity': flag ? 1 : 0}}>
            <p>{text}</p>
        </article>
    )
}

export { Message };