import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropBooksComponent } from './drag-drop-books.component';

describe('DragDropBooksComponent', () => {
  let component: DragDropBooksComponent;
  let fixture: ComponentFixture<DragDropBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragDropBooksComponent]
    });
    fixture = TestBed.createComponent(DragDropBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
