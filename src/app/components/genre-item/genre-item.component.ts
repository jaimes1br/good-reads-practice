import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataGenre } from '../../shared/interfaces/DataGenre';

@Component({
  selector: 'goodReads-genre-item',
  templateUrl: './genre-item.component.html',
  styleUrls: ['./genre-item.component.scss']
})
export class GenreItemComponent implements OnInit{
  
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
