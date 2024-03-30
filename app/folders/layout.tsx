'use client'
import { useState, useEffect } from 'react';
import styles from './layout.module.css';
import { getCookie } from 'cookies-next';
import { FolderType } from '@/types/FoldersType';
import axios from 'axios';
import Link from 'next/link';




const Folders = ({children}: {children: React.ReactNode}) => {


    const _id: string | undefined = getCookie('_id');

    const [folders, setFolders] = useState<FolderType[]>([]);

    useEffect(() => {

        const src: string = 'http://localhost:8080/manage/getFolders';

        axios.post(src, {
            _id
        }).then(res => {
            setFolders(res.data);
        })


    }, [])


    return (
        <>
            {folders.length > 0 ? <section className={styles.window}>
                <div className={styles.folders}>
                    <h3>Мои папки</h3>
                    {folders.map((folder, index) => {
                        return (
                            <Link key={index} href={`/folders/${index}`}>
                                {folder.title}
                            </Link>
                        )
                    })}
                </div>
                <div className={styles.pictures}>
                    {children}
                </div>
            </section> : <div className={styles.error}><h3>У вас пока нет папок.</h3> <Link  href={'/profile'}>Создать?</Link></div>}
        </>
        
    )
}

export default Folders;