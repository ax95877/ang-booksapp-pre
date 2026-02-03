import { createAction, props } from '@ngrx/store';
import { Book } from '../models/book.model';

export const loadBooks = createAction('[Books List] Load Books');

export const loadBooksSuccess = createAction(
    '[Books List] Load Books Success',
    props<{ books: Book[] }>()
);

export const loadBooksFailure = createAction(
    '[Books List] Load Books Failure',
    props<{ error: string }>()
);

export const addFavorite = createAction(
    '[Books List] Add Favorite',
    props<{ bookId: string }>()
);

export const removeFavorite = createAction(
    '[Books List] Remove Favorite',
    props<{ bookId: string }>()
);