'use client'
import axios from 'axios';
import styles from './page.module.css';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import pictureIcon from './../../icons/picture.svg';
import { getCookie } from 'cookies-next';

interface ModalPropsType {
    image: File | null
}


interface FormStateType {
    title: string,
    description: string,
    folderName: string
}

const _id: string | undefined = getCookie('_id');

const Modal: React.FC<ModalPropsType> = ({image}) => {




    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isValid
        }
    } = useForm<FormStateType>({
        mode: 'onBlur'
    });


const [formData, setFormData] = useState(new FormData());

    const uploadFile = async (data: FormStateType) => {

        const title: string = data.title;
        const description: string = data.description;

        if (image) {
            if (_id) {
                formData.append('image', image);
                formData.set('folderName', 'Folder');
                formData.set('_id', _id);
                formData.append('title', title);
                formData.append('description', description);
            } else {
                return;
            }
            

            const src: string  = 'http://localhost:8080/manage/addPicture';

            try {
                const res = await fetch(src, {
                    method: 'POST',
                    body: formData
                });

                const resData = await res.json();

                console.log(resData);
            } catch (e) {
                console.log(e);
            }
            
        } else {
            return;
        }
    }
    
    

    return (
        <section className={styles.modal}>
            <h1>Добавьте картинку</h1>
            <form onSubmit={handleSubmit(uploadFile)}> 
                <input {...register('title', {
                    required: 'Дайте имя картинке'
                })} type="text"  placeholder='Название картинки'/>
                <input {...register('description')} type="text" placeholder='Описание картинки'/>
                <input disabled={!isValid} style={{'cursor': isValid ? 'pointer' : 'not-allowed'}} className={styles.submitBtn} type="submit" />
            </form>
        </section>
    )
}





const CreatePage: React.FC = () => {

    const selectRef = useRef<any>(null);

    const [image, setImage] = useState<File | null>(null);

    const [modal, setModal] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const selectedImage = event.target.files && event.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
            console.log(selectedImage);
        }
    }
    

    const handlePick = () => {
        setModal(true);
        selectRef.current.click();
    }

    

    return (
        <section className={styles.window}>
                {modal && <Modal image={image}/>}
                <input ref={selectRef} className={styles.select} type="file" onChange={handleChange} accept='image/*,.png,.gif,.web,.svg,.heic,'/>
                <button className={styles.selectBtn} onClick={handlePick}><Image alt='' src={pictureIcon} width={30} height={30}/> Выбрать картинку</button>
        </section>
    )
}

export default CreatePage;