'use client'
import styles from './Header.module.css';
import Link from 'next/link';
import { getCookie, setCookie } from 'cookies-next';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import profileIcon  from './../../icons/profile.svg';
import arrow from './../../icons/arrow.svg';
import Image from 'next/image';
import MenuBar from '../MenuBar/MenuBar';


const Header: React.FC = () => {

    const menuRef = useRef<HTMLDivElement>(null);

    const token: string | undefined = getCookie('token');


    const [tokenCheck, setTokenCheck] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(false);


    useEffect(() => {
        const handleClickOutside = (event: any) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(false);
          }
        };

        document.addEventListener('click', handleClickOutside);


        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    useEffect(() => {
        const src: string = 'http://localhost:8080/auth/getData'
        if (token) {
            axios.post(src, {
                token
            }).then(res => {
                setCookie('username', res.data.username);
                setCookie('email', res.data.email);
                setCookie('_id', res.data._id);
            })
            setTokenCheck(true);
        } else if (!token) {
            setTokenCheck(false);
        }

    }, [tokenCheck]);

    const closeMenu = () => {
        setMenu(false);
    }

    const username: string | undefined = getCookie('username');




    return (
        <header className={styles.header} ref={menuRef}>
            <h1><Link href={'/'}>Gallery</Link></h1>
            {menu && <MenuBar/>}
            {tokenCheck ? <div className={styles.profile}><Image src={profileIcon} alt='' width={30} height={30}/> <Link href={'/profile'}>{username}</Link> <Image onClick={() => setMenu(true)} className={styles.menuBtn} src={arrow} alt='' width={20} height={20}/> </div> : <nav>
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