import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataGenre } from '@core/models/DataGenre.model';
import { NgFor } from '@angular/common';
import { GenreItemComponent } from '../genre-item/genre-item.component';

@Component({
    selector: 'goodReads-genre-list',
    templateUrl: './genre-list.component.html',
    styleUrls: ['./genre-list.component.scss'],
    standalone: true,
    imports: [NgFor, GenreItemComponent]
})
export class GenreListComponent implements OnInit{
  
  selectedItem!: DataGenre;  
  @Input({required: true}) listGenres: DataGenre[] = [];
  @Output() filterSelectedEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.selectedItem = this.listGenres.filter(genre => genre.isSelected)[0];
  }

  onChangeSelected(indexSelected: number): void{
    const prevIndex = this.listGenres.indexOf(this.selectedItem);
    if(prevIndex !== -1){
      this.listGenres[prevIndex].isSelected = false;
      this.listGenres[indexSelected].isSelected = true;
      this.selectedItem = this.listGenres[indexSelected];
      this.filterSelectedEvent.emit(this.selectedItem.name);
    }
  }
}
