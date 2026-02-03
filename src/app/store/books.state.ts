import { Book } from '../models/book.model';

export interface BooksState {
    books: Book[];
    favorites: string[];
    loading: boolean;
    error: string | null;
}

export const initialState: BooksState = {
    books: [],
    favorites: [],
    loading: false,
    error: null
};