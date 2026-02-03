import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Book, BooksResponse } from '../models/book.model';

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    private apiUrl = 'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks';

    constructor(private http: HttpClient) { }

    private mockBooks: Book[] = [
        {
            id: '1',
            volumeInfo: {
                title: 'The Man Who Mistook His Wife for a Hat',
                authors: ['Oliver Sacks'],
                description: 'In his most extraordinary book, "one of the great clinical writers of the 20th century" (The New York Times) recounts the case histories of patients lost in the bizarre, apparently inescapable world of neurological disorders.',
                imageLinks: {
                    thumbnail: 'http://books.google.com/books/content?id=3ZbRBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                publishedDate: '1985'
            }
        },
        {
            id: '2',
            volumeInfo: {
                title: 'Awakenings',
                authors: ['Oliver Sacks'],
                description: 'Awakenings—which inspired the major motion picture—is the remarkable story of a group of patients who contracted sleeping-sickness during the great epidemic just after World War I.',
                imageLinks: {
                    thumbnail: 'http://books.google.com/books/content?id=OmZ2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                publishedDate: '1973'
            }
        },
        {
            id: '3',
            volumeInfo: {
                title: 'Musicophilia: Tales of Music and the Brain',
                authors: ['Oliver Sacks'],
                description: 'Revised and Expanded With the same trademark compassion and erudition he brought to The Man Who Mistook His Wife for a Hat, Oliver Sacks explores the place music occupies in the brain and how it affects the human condition.',
                imageLinks: {
                    thumbnail: 'http://books.google.com/books/content?id=5o_0AAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                publishedDate: '2007'
            }
        },
        {
            id: '4',
            volumeInfo: {
                title: 'Uncle Tungsten',
                authors: ['Oliver Sacks'],
                description: 'Long before Oliver Sacks became a distinguished neurologist and bestselling writer, he was a small English boy fascinated by metals-also by chemical reactions (the louder and smellier the better), photography, squids and cuttlefish, H.G. Wells, and the periodic table.',
                publishedDate: '2001'
            }
        },
        {
            id: '5',
            volumeInfo: {
                title: 'Hallucinations',
                authors: ['Oliver Sacks'],
                description: 'Have you ever seen something that wasn’t there? Heard someone calling your name when you’re alone? Felt someone following you and turned around to find nothing?',
                imageLinks: {
                    thumbnail: 'http://books.google.com/books/content?id=k4t2Pjs43KMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                publishedDate: '2012'
            }
        }
    ];

    getBooks(): Observable<Book[]> {
        return this.http.get<BooksResponse>(this.apiUrl).pipe(
            map(response => response.items || []),
            catchError(error => {
                console.warn('API Error, using mock data:', error);
                return of(this.mockBooks);
            })
        );
    }
}
