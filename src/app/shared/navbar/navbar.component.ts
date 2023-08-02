import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { BooksNumbers } from '../interfaces/Books';

@Component({
  selector: 'goodReads-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  isHome: boolean = true;
  isMyList: boolean = false;

  routerSub!: Subscription;
  numbersSub!: Subscription;

  constructor(private router: Router,private bookService: BookService){}

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        this.isHome = event.url.includes('home');
      }
    });

    this.numbersSub = this.bookService.bookNumbers$.subscribe(({ myList }:BooksNumbers) => {
      this.isMyList = myList > 0;
    })
  }

  ngOnDestroy(): void {
    if(this.routerSub) this.routerSub.unsubscribe();
    if(this.numbersSub) this.numbersSub.unsubscribe();
  }
}
