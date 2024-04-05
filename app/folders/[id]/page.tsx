'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { PictureType } from "@/types/FoldersType";
import { getCookie } from "cookies-next";
import styles from './../layout.module.css';
import { Picture } from "@/components/Picture/Picture";

const Folder= ({params}: {params: {id: number}}) => {
    const [pictures, setPictures] = useState<PictureType[]>([]);

    const _id: string | undefined = getCookie('_id');

    useEffect(() => {
        const src: string = 'http://localhost:8080/manage/getFolders'

        axios.post(src, {
            _id
        }).then(res => {
            setPictures(res.data[params.id].pictures);
        });
    }, []);

    return (
        <section>
            <div className={styles.pictures}>
                {pictures.map((picture, index) => {
                        return (
                            <Picture key={index} url={picture.url}/>
                        )
                    })}
            </div>
        </section>
    )
}

export default Folder;