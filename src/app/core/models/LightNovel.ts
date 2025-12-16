export interface LightNovel {
    id: number;
    title: string;
    author: string;
    price: number;
    description: string;
    cover: string;
    genres?: string[];
    releaseDate?: Date;
    stock?: number;
}
