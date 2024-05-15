export interface Library {
    library: LibraryElement[];
}

export interface LibraryElement {
    book: Book;
}

export interface Book {
    title:    string;
    pages:    number;
    genre:    string;
    cover:    string;
    synopsis: string;
    year:     number;
    ISBN:     string;
    author:   Author;
}

export interface Author {
    name:       string;
    otherBooks: string[];
}

export interface BooksNumbers {
    available: number;
    myList: number;
    maxPages: number;
}

export interface BookPreview {
    title:  string;
    author: string;
    cover:  string;
}