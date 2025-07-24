import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorductsComponent } from './porducts.component';

describe('PorductsComponent', () => {
  let component: PorductsComponent;
  let fixture: ComponentFixture<PorductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
