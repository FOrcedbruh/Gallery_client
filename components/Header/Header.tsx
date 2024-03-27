'use client'
import styles from './Header.module.css';
import Link from 'next/link';
import { getCookie, setCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import profileIcon  from './../../icons/profile.svg';
import arrow from './../../icons/arrow.svg';
import Image from 'next/image';



const Header: React.FC = () => {

    const token: string | undefined = getCookie('token');


    const [tokenCheck, setTokenCheck] = useState<boolean>(false);



    useEffect(() => {
        const src: string = 'http://localhost:8080/auth/getData'
        if (token) {
            axios.post(src, {
                token
            }).then(res => {
                setCookie('username', res.data.username);
                setCookie('email', res.data.email);
            })
            setTokenCheck(true);
        } else if (!token) {
            setTokenCheck(false);
        }

    }, [tokenCheck]);

    const username: string | undefined = getCookie('username');


    return (
        <header className={styles.header}>
            <h1><Link href={'/'}>Gallery</Link></h1>
            {tokenCheck ? <div className={styles.profile}><Image src={profileIcon} alt='' width={30} height={30}/> <Link href={'/profile'}>{username}</Link> <Image src={arrow} alt='' width={20} height={20}/> </div> : <nav>
                <ul>
                    <li>
                        <Link href={'/login'}><span>Войти</span></Link>
                    </li>
                    <li>
                        <Link href={'/registration'}>Зарегистрироваться</Link>
                    </li>
                </ul>
           </nav>}
        </header>
    )
}

export default Header;