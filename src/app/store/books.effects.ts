import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { BooksService } from '../services/books.service';
import * as BooksActions from './books.actions';

@Injectable()
export class BooksEffects {
    private actions$ = inject(Actions);
    private booksService = inject(BooksService);

    loadBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActions.loadBooks),
            switchMap(() =>
                this.booksService.getBooks().pipe(
                    map(books => BooksActions.loadBooksSuccess({ books })),
                    catchError((error: any) =>
                        of(BooksActions.loadBooksFailure({ error: error.message }))
                    )
                )
            )
        )
    );
}
