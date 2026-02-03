import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import * as BooksActions from '../../store/books.actions';
import * as BooksSelectors from '../../store/books.selectors';

@Component({
  selector: 'app-books-list',
  imports: [CommonModule],
  templateUrl: './books-list.html',
  styleUrl: './books-list.css',
})
export class BooksList implements OnInit {
  books$: Observable<Book[]>;
  favoriteBooks$: Observable<Book[]>;
  favorites$: Observable<string[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  activeTab: 'all' | 'favorites' = 'all';

  constructor(private store: Store) {
    this.books$ = this.store.select(BooksSelectors.selectBooks);
    this.favoriteBooks$ = this.store.select(BooksSelectors.selectFavoriteBooks);
    this.favorites$ = this.store.select(BooksSelectors.selectFavorites);
    this.loading$ = this.store.select(BooksSelectors.selectLoading);
    this.error$ = this.store.select(BooksSelectors.selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(BooksActions.loadBooks());
  }

  setActiveTab(tab: 'all' | 'favorites'): void {
    this.activeTab = tab;
  }

  isFavorite(bookId: string): Observable<boolean> {
    return this.store.select(BooksSelectors.selectIsFavorite(bookId));
  }

  toggleFavorite(bookId: string, isFavorite: boolean): void {
    if (isFavorite) {
      this.store.dispatch(BooksActions.removeFavorite({ bookId }));
    } else {
      this.store.dispatch(BooksActions.addFavorite({ bookId }));
    }
  }
}
