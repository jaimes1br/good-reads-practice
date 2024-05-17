import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'goodReads-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  src: string = ''
  
  constructor(private router: Router) { }

  onSearch(): void {
    if(this.src.trim() === '') return
    this.router.navigate(['/books',this.src.toLowerCase()]);
  }
}
