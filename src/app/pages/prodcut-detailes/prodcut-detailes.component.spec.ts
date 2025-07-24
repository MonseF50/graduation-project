import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutDetailesComponent } from './prodcut-detailes.component';

describe('ProdcutDetailesComponent', () => {
  let component: ProdcutDetailesComponent;
  let fixture: ComponentFixture<ProdcutDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdcutDetailesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdcutDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
