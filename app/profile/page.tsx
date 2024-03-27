'use client'
import styles from './page.module.css';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';




const ProfilePage: React.FC = () => {

    const token: string | undefined = getCookie('token');

    const [username, setUsername] = useState<string | undefined>('');
    const [email, setEmail] = useState<string | undefined>('');

    useEffect(() => {
        setEmail(getCookie('email'));
        setUsername(getCookie('username'));
    }, [token]);


    


    return (
        <section className={styles.window}>
            <div className={styles.info}>
                <h1>{username}</h1>
                <h5>{email}</h5>
            </div>
            <div className={styles.pictures}>

            </div>
        </section>
    )
}

export default ProfilePage;