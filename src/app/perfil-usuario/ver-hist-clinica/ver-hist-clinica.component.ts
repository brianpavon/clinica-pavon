import { Component, OnInit, Input } from '@angular/core';
import { HistoriaClinica } from 'src/app/interfaces/historia-clinica';

@Component({
  selector: 'app-ver-hist-clinica',
  templateUrl: './ver-hist-clinica.component.html',
  styleUrls: ['./ver-hist-clinica.component.css']
})
export class VerHistClinicaComponent implements OnInit {
  @Input() histClin !: HistoriaClinica
  constructor() { }

  ngOnInit(): void {
  }

}
