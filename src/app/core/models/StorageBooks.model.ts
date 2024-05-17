import { LibraryElement } from "./Books.model";

export interface MyList {
    pending: string[];
    reading: string[];
    read: string[];
}

export interface MyListBooks {
    pending: LibraryElement[];
    reading: LibraryElement[];
    read: LibraryElement[];
}