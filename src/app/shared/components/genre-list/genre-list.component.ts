import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataGenre } from '@core/models/DataGenre.model';

@Component({
  selector: 'goodReads-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent {
  
  selectedItem!: DataGenre;  
  @Input() listGenres: DataGenre[] = [];
  @Output() filterSelectedEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.selectedItem = this.listGenres.filter(genre => genre.isSelected)[0];
    // console.log('Se crea con -> ', this.selectedItem);
    
  }

  onChangeSelected(indexSelected: number){
    const prevIndex = this.listGenres.indexOf(this.selectedItem);
    if(prevIndex !== -1){
      this.listGenres[prevIndex].isSelected = false;
      this.listGenres[indexSelected].isSelected = true;
      this.selectedItem = this.listGenres[indexSelected];
      this.filterSelectedEvent.emit(this.selectedItem.name);
    }
  }
}
