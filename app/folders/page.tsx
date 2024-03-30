'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { PictureType } from "@/types/FoldersType";
import { getCookie } from "cookies-next";



const Page: React.FC = () => {

    const [pictures, setPictures] = useState<PictureType[]>([]);

    const _id: string | undefined = getCookie('_id');

    useEffect(() => {
        const src: string = 'http://localhost:8080/manage/getFolders'

        axios.post(src, {
            _id
        }).then(res => {
            setPictures(res.data[0].pictures);
        });
    }, []);

    return (
        <section>
            <h1>
                {pictures.map((picture, index) => {
                    return (
                        <p key={index}>{picture.title}</p>
                    )
                })}
            </h1>
        </section>
    )
}

export default Page;