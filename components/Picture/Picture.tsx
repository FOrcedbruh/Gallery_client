
import Image from "next/image";
import styles from './Picture.module.css';


interface PicturePropsType {
    width?: number,
    height?: number,
    title?: string,
    url: any,
    description?: string,
    date?: string
}


const Picture: React.FC<PicturePropsType> = ({url, title, date, description, width, height}) => {


    return (
        <div className={styles.main}>
            <Image width={600} height={400} priority  alt="" src={url} />
        </div>
    )
}

export { Picture };