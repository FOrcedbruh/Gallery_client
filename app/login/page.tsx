'use client'
import styles from './page.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { Message } from '@/components/Message/Message';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface FormStateType {
    email: string,
    password: string
}


const LoginPage: React.FC = () => {

    const router = useRouter();

    const [text, setText] = useState<string>('');

    const {
        register, 
        handleSubmit,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm<FormStateType>({
        mode: 'onBlur'
    });


    const onSubmit = (data: FormStateType) => {
        const email: string = data.email;
        const password: string = data.password;

        const src: string = 'http://localhost:8080/auth/login';

        axios.post(src, {
            email,
            password
        }).then(res => {
            setText(res.data.message);
            const token: string = res.data.token;
            setCookie('token', token, { secure: true });
        });
        setTimeout(() => {
            router.push('/profile');
        }, 2000);

        

        reset();
    }


    return (
        <section className={styles.window}>
            {text && <Message text={text}/>}
            <h1>Войдите в свой аккаунт</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}> 
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
                    <input placeholder='Пароль' type="password" {...register('password', {
                        required: 'Введите пароль',
                        minLength: {
                            value: 6,
                            message: 'Пароль должен содержать менее 6 символов'
                        }
                    })}/>
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>
                <input disabled={!isValid} type="submit" className={styles.submitBtn} style={{'cursor': isValid ? 'pointer' : 'not-allowed'}} value={'Войти'}/>
                <h5>Ещё нет аккаунта? <Link href={'/registration'}>Зарегистрироваться</Link></h5>
            </form>
        </section>
    )
}




export default LoginPage;