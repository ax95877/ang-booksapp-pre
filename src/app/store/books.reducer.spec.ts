import { booksReducer } from './books.reducer';
import { initialState } from './books.state';
import * as BooksActions from './books.actions';
import { Book } from '../models/book.model';

describe('BooksReducer', () => {
    it('should return the default state', () => {
        const action = { type: 'Unknown' };
        const state = booksReducer(initialState, action);

        expect(state).toBe(initialState);
    });

    it('should set loading to true on loadBooks', () => {
        const action = BooksActions.loadBooks();
        const state = booksReducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should update books and set loading to false on loadBooksSuccess', () => {
        const books: Book[] = [{ id: '1', volumeInfo: { title: 'Test Book', authors: ['Author'] } }];
        const action = BooksActions.loadBooksSuccess({ books });
        const state = booksReducer({ ...initialState, loading: true }, action);

        expect(state.books).toEqual(books);
        expect(state.loading).toBe(false);
    });

    it('should update error and set loading to false on loadBooksFailure', () => {
        const error = 'Error loading books';
        const action = BooksActions.loadBooksFailure({ error });
        const state = booksReducer({ ...initialState, loading: true }, action);

        expect(state.error).toBe(error);
        expect(state.loading).toBe(false);
    });

    it('should add a favorite book id', () => {
        const bookId = '123';
        const action = BooksActions.addFavorite({ bookId });
        const state = booksReducer(initialState, action);

        expect(state.favorites).toContain(bookId);
    });

    it('should remove a favorite book id', () => {
        const bookId = '123';
        const startState = { ...initialState, favorites: [bookId, '456'] };
        const action = BooksActions.removeFavorite({ bookId });
        const state = booksReducer(startState, action);

        expect(state.favorites).not.toContain(bookId);
        expect(state.favorites).toContain('456');
    });
});
