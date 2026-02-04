import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    private apiUrl = 'https://openlibrary.org/search.json?author=oliver+sacks&limit=20';

    constructor(private http: HttpClient) { }

    getBooks(): Observable<Book[]> {
        return this.http.get<any>(this.apiUrl).pipe(
            map(response => {
                const docs = response.docs || [];
                return docs.map((doc: any) => ({
                    id: doc.key,
                    volumeInfo: {
                        title: doc.title,
                        authors: doc.author_name || [],
                        description: doc.first_sentence ? doc.first_sentence[0] : 'No description available',
                        imageLinks: doc.cover_i ? {
                            thumbnail: `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                        } : undefined,
                        publishedDate: doc.first_publish_year ? doc.first_publish_year.toString() : undefined
                    }
                } as Book));
            }),
            catchError(error => {
                console.warn('API Error:', error);
                return of([]);
            })
        );
    }
}
