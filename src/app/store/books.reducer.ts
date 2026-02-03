import { createReducer, on } from '@ngrx/store';
import { BooksState, initialState } from './books.state';
import * as BooksActions from './books.actions';

export const booksReducer = createReducer(
    initialState,
    on(BooksActions.loadBooks, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(BooksActions.loadBooksSuccess, (state, { books }) => ({
        ...state,
        loading: false,
        books
    })),
    on(BooksActions.loadBooksFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(BooksActions.addFavorite, (state, { bookId }) => ({
        ...state,
        favorites: [...state.favorites, bookId]
    })),
    on(BooksActions.removeFavorite, (state, { bookId }) => ({
        ...state,
        favorites: state.favorites.filter(id => id !== bookId)
    }))
);
