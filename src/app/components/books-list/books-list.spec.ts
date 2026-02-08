import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BooksList } from './books-list';
import * as BooksActions from '../../store/books.actions';
import { BooksState } from '../../store/books.state';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('BooksList', () => {
  let component: BooksList;
  let fixture: ComponentFixture<BooksList>;
  let store: MockStore;
  const initialState: BooksState = {
    books: [],
    favorites: [],
    loading: false,
    error: null
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksList],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BooksList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadBooks action on init', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(BooksActions.loadBooks());
  });
});
