import styles from './Header.module.css';
import Link from 'next/link';
import { getCookie } from 'cookies-next';




const Header: React.FC = () => {

    const token: string | undefined = getCookie('token');

    


    return (
        <header className={styles.header}>
           <h1><Link href={'/'}>Gallery</Link></h1>
            {token ? <Link href={'/profile'}>Профиль</Link> : <nav>
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