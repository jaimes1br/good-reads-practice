import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { DataGenre } from '@core/models/DataGenre.model';

@Component({
    selector: 'goodReads-genre-item',
    templateUrl: './genre-item.component.html',
    styleUrls: ['./genre-item.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class GenreItemComponent {
  @Input() dataGenre: DataGenre = { name: '', isSelected: false, index: 0}
  @Output() selectetEmitter = new EventEmitter<number>();

  onSelected(): void{
    this.dataGenre.isSelected = !this.dataGenre.isSelected;
    this.selectetEmitter.emit(this.dataGenre.index);
  }
}
