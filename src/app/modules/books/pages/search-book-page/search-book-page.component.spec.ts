import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookPageComponent } from './search-book-page.component';

describe('SearchBookPageComponent', () => {
  let component: SearchBookPageComponent;
  let fixture: ComponentFixture<SearchBookPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SearchBookPageComponent]
});
    fixture = TestBed.createComponent(SearchBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
