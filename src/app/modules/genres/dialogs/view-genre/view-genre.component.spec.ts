import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGenreComponent } from './view-genre.component';

describe('ViewGenreComponent', () => {
  let component: ViewGenreComponent;
  let fixture: ComponentFixture<ViewGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGenreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
