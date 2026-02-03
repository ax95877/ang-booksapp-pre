import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BooksState } from './books.state';
import { Book } from '../models/book.model';

export const selectBooksState = createFeatureSelector<BooksState>('books');

export const selectBooks = createSelector(
    selectBooksState,
    (state: BooksState) => state.books
);

export const selectLoading = createSelector(
    selectBooksState,
    (state: BooksState) => state.loading
);

export const selectError = createSelector(
    selectBooksState,
    (state: BooksState) => state.error
);

export const selectFavorites = createSelector(
    selectBooksState,
    (state: BooksState) => state.favorites
);

export const selectFavoriteBooks = createSelector(
    selectBooks,
    selectFavorites,
    (books: Book[], favorites: string[]) => {
        return books.filter(book => favorites.includes(book.id));
    }
);

export const selectIsFavorite = (bookId: string) => createSelector(
    selectFavorites,
    (favorites: string[]) => favorites.includes(bookId)
);
