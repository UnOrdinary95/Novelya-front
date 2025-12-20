export interface LightNovel {
    _id?: string;
    title: string;
    author: string;
    price: number;
    inStock: boolean;
    cover: string;
    description: string;
    genres: string[];
    releaseDate?: Date;
}
