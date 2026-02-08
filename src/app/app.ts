import { Component, signal } from '@angular/core';
import { BooksList } from './components/books-list/books-list';

@Component({
  selector: 'app-root',
  imports: [BooksList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('booksapp');
}
