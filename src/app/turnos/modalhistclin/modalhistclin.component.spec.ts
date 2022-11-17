import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalhistclinComponent } from './modalhistclin.component';

describe('ModalhistclinComponent', () => {
  let component: ModalhistclinComponent;
  let fixture: ComponentFixture<ModalhistclinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalhistclinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalhistclinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
