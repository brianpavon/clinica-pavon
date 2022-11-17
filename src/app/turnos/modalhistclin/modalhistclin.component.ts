import { Component, OnInit, Input } from '@angular/core';
import { HistoriaClinica } from 'src/app/interfaces/historia-clinica';

@Component({
  selector: 'app-modalhistclin',
  templateUrl: './modalhistclin.component.html',
  styleUrls: ['./modalhistclin.component.css']
})
export class ModalhistclinComponent implements OnInit {
  @Input() histClin !: HistoriaClinica
  constructor() { }

  ngOnInit(): void {
  }

}
