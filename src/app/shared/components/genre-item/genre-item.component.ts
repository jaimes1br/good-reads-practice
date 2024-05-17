import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataGenre } from '@core/models/DataGenre.model';

@Component({
  selector: 'goodReads-genre-item',
  templateUrl: './genre-item.component.html',
  styleUrls: ['./genre-item.component.scss']
})
export class GenreItemComponent {
  @Input() dataGenre: DataGenre = { name: '', isSelected: false, index: 0}
  @Output() selectetEmitter = new EventEmitter<number>();

  constructor(){}

  ngOnInit(): void { 
  }

  onSelected(){
    this.dataGenre.isSelected = !this.dataGenre.isSelected;
    this.selectetEmitter.emit(this.dataGenre.index);
  }
}
