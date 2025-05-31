export interface Review {
    owner: string;
    content: string;
    rating: number;
    date: string;
}

export interface Book {
    isbn: string;
    title: string;
    authors: string | string[];
    publisher: string;
    likes: number;
    image: string;
    reviews: Review[];
    id?: string
}
