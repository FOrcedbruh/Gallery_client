'use client'
import axios from 'axios';
import styles from './page.module.css';
import { useState, useRef } from 'react';



const CreatePage: React.FC = () => {

    const selectRef = useRef<any>(null);

    const [selected, setSelected] = useState<any>(null);


    const handleChange = (event: any) => {
        const file = event.target.files[0];
        console.log(event.target.files[0]);

        const reader = new FileReader();

        reader.onload = async  () => {
            const result = reader.result;
            if (typeof result === 'string') {
                setSelected(result);
            }
        }
        reader.readAsDataURL(file);
    }

    const src: string = 'http://localhost:8080/addPicture';
 
    const handleUploaded = () => {
        console.log(selected);
    }

    const handlePick = () => {
        selectRef.current.click();
    }

    return (
        <section className={styles.window}>
                <input ref={selectRef} className={styles.select} type="file" onChange={handleChange} accept='image/*,.png,.gif,.web,.svg,.heic,'/>
                <button onClick={handlePick}>Выбрать картинку</button>
                <button onClick={handleUploaded}>Сохранить выбранные картинки</button>
        </section>
    )
}

export default CreatePage;