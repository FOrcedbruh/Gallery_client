'use client'
import styles from './MenuBar.module.css';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const MenuBar: React.FC = () => {

    const router = useRouter();

    const Logout = () => {
        deleteCookie('token');
        deleteCookie('username');
        deleteCookie('email');
        deleteCookie('_id');

        router.push('/login');
    }

    return (
        <div className={styles.container}>
            <ul>
                <li onClick={() => router.push('/folders')}>
                    Мои папки
                </li>
                <li onClick={Logout}>
                    Выход
                </li>
            </ul>
        </div>
    )
}

export default MenuBar;