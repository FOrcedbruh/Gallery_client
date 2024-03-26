'use client'
import styles from './page.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Message } from '@/components/Message/Message';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface FormStateType {
    username: string,
    email: string,
    password: string
}


const RegistrationPage: React.FC = () => {

    const router = useRouter();

    const [text, setText] = useState<string>('');

    const {
        register,
        formState: {
            errors,
            isValid
        },
        reset,
        handleSubmit
    } = useForm<FormStateType>({mode: 'onBlur'});


    const onSubmit = (data: FormStateType) => {
        const username: string = data.username;
        const email: string = data.email;
        const password: string = data.password;

        const src: string = "http://localhost:8080/auth/registration";

        axios.post(src, {
            username,
            email,
            password
        }).then(res => {
            setText(res.data.message);
        });

        reset();


        setTimeout(() => router.push('/login'), 2000);
    }


    return (
        <section className={styles.window}>
            {text && <Message  text={text}/>}
            <h1>Добро пожаловать в Gallery</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Имя пользователя</label>
                    <input type="text" {...register('username', {
                        required: 'Введите имя',
                        minLength: {
                            value: 2,
                            message: 'Имя должно состоять мимнимум из 2 символов'
                        }
                    })} placeholder='Имя'/>
                    {errors.username && <p className={styles.error}>{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor="email">Почта</label>
                    <input type="text" placeholder='Почта' {...register('email', {
                        required: 'Введите почту',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Неверный формат почты'
                        }
                    })}/>
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" placeholder='Пароль' {...register('password', {
                        required: 'Введите пароль',
                        minLength: {
                            value: 6,
                            message: 'Пароль должен содержать не меннее 6 символов'
                        }
                    })}/>
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>
                <input style={{'cursor': isValid ? 'pointer' : 'not-allowed'}} disabled={!isValid} className={styles.submitBtn} type="submit" value={'Зарегистрироваться'}/>
                <h5>У вас уже есть аккаунт? <Link href={'/login'}>Войти</Link></h5>
            </form>
        </section>
    )
}

export default RegistrationPage;