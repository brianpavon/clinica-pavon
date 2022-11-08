import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerComentarioComponent } from './modal-ver-comentario.component';

describe('ModalVerComentarioComponent', () => {
  let component: ModalVerComentarioComponent;
  let fixture: ComponentFixture<ModalVerComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
