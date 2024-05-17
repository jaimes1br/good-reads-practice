import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'goodReads-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class SearchComponent {
  src: string = ''
  
  constructor(private router: Router) { }

  onSearch(): void {
    if(this.src.trim() === '') return
    this.router.navigate(['/books',this.src.toLowerCase()]);
  }
}
