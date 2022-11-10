import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHistClinicaComponent } from './ver-hist-clinica.component';

describe('VerHistClinicaComponent', () => {
  let component: VerHistClinicaComponent;
  let fixture: ComponentFixture<VerHistClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerHistClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerHistClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
