import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosEstadisticasComponent } from './graficos-estadisticas.component';

describe('GraficosEstadisticasComponent', () => {
  let component: GraficosEstadisticasComponent;
  let fixture: ComponentFixture<GraficosEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficosEstadisticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
