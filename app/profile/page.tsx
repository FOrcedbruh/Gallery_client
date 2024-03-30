'use client'
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import React, { SetStateAction, useEffect, useState } from 'react';
import ProfileIcon from './../../icons/profile.svg';
import styles from './page.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Message } from '@/components/Message/Message';
import cross from './../../icons/cross.svg';



interface FormStateType {
    title: string,
    description: string,
}

interface ModalProps {
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    setFolderState: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateFolderModal: React.FC<ModalProps> = ({text, setText, setFolderState}) => {

    const _id: string | undefined = getCookie('_id');

    const {
        register,
        formState: {
            errors,
            isValid
        },
        reset,
        handleSubmit
    } = useForm<FormStateType>({
        mode: 'onBlur'
    });


    const onSubmit = (data: FormStateType) => {

        const src: string = 'http://localhost:8080/manage/addFolder'
        const title: string = data.title;
        const description: string = data.description;

        axios.post(src, {
            title,
            description,
            _id
        }).then(res => {
            setText(res.data.message);
            console.log(res.data);
        });

        reset();

        setFolderState(false);
    }

    return (
        <section className={styles.modal}>
            <Image onClick={() => setFolderState(false)} className={styles.close} src={cross} alt='' width={30} height={30}/>
            <h1>Создание папки</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('title', {
                    required: 'Введите имя папки'
                })} placeholder='Имя папки'/>
                <input type="text" {...register('description')} placeholder='Описание папки'/>
                <input style={{'cursor': isValid ? 'pointer' : 'not-allowed'}} className={styles.submitBtn} type="submit" disabled={!isValid} value={'Создать папку'}/>
            </form>
        </section>
    )
};


const ProfilePage: React.FC = () => {

    const token: string | undefined = getCookie('token');

    const [username, setUsername] = useState<string | undefined>('');
    const [email, setEmail] = useState<string | undefined>('');

    const [avatar, setAvatar] = useState<string>('');


    useEffect(() => {
        setUsername(getCookie('username'));
        setEmail(getCookie('email'));
        

    }, [token]);

    const [folderState, setFolderState] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    return (
        <section className={styles.window}>
            {text && <Message text={text}/>}
            {folderState && <CreateFolderModal setFolderState={setFolderState} text={text} setText={setText}/>}
            <div className={styles.info}>
                <Image src={ProfileIcon} priority alt='' width={100} height={100}/>
                <h1>{username}</h1>
                <h5>{email}</h5>
                <button onClick={() => setFolderState(true)} className={styles.createBtn}>Создать папку</button>
            </div>
            <div className={styles.pictures}>

            </div>
        </section>
    )
}

export default ProfilePage;