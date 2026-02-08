import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { BooksEffects } from './books.effects';
import { BooksService } from '../services/books.service';
import * as BooksActions from './books.actions';
import { Book } from '../models/book.model';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('BooksEffects', () => {
    let actions$: Observable<Action>;
    let effects: BooksEffects;
    // Use a type that includes the spy method for the mock
    let booksService: { getBooks: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        booksService = {
            getBooks: vi.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                BooksEffects,
                provideMockActions(() => actions$),
                { provide: BooksService, useValue: booksService }
            ]
        });

        effects = TestBed.inject(BooksEffects);
    });

    it('should return loadBooksSuccess when loadBooks is successful', () => {
        const books: Book[] = [{ id: '1', volumeInfo: { title: 'Test', authors: [] } }];
        actions$ = of(BooksActions.loadBooks());
        booksService.getBooks.mockReturnValue(of(books));

        effects.loadBooks$.subscribe(action => {
            expect(action).toEqual(BooksActions.loadBooksSuccess({ books }));
        });
    });

    it('should return loadBooksFailure when loadBooks fails', () => {
        const error = 'Network Error';
        actions$ = of(BooksActions.loadBooks());
        booksService.getBooks.mockReturnValue(throwError(() => new Error(error)));

        effects.loadBooks$.subscribe(action => {
            expect(action).toEqual(BooksActions.loadBooksFailure({ error }));
        });
    });
});
