
export interface PictureType {
    title?: string,
    description?: string,
    url: string,
    date?: string
}


export  interface FolderType {
    title: string,
    description?: string,
    pictures?: PictureType[]
}