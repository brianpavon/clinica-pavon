import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosMedicoComponent } from './turnos-medico.component';

describe('TurnosMedicoComponent', () => {
  let component: TurnosMedicoComponent;
  let fixture: ComponentFixture<TurnosMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
