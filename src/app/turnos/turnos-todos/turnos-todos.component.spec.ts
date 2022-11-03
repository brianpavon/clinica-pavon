import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosTodosComponent } from './turnos-todos.component';

describe('TurnosTodosComponent', () => {
  let component: TurnosTodosComponent;
  let fixture: ComponentFixture<TurnosTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosTodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
