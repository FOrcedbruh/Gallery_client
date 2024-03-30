'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { PictureType } from "@/types/FoldersType";
import { getCookie } from "cookies-next";
import Image from "next/image";

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
            <h1>
                {pictures.map((picture, index) => {
                    return (
                        <div key={index}>
                            <p>{picture.title}</p>
                        </div>
                    )
                })}
            </h1>
        </section>
    )
}

export default Folder;