import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproductsComponent } from './viewproducts.component';

describe('ViewproductsComponent', () => {
  let component: ViewproductsComponent;
  let fixture: ComponentFixture<ViewproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
