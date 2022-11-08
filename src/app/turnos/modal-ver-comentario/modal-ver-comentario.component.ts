import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-ver-comentario',
  templateUrl: './modal-ver-comentario.component.html',
  styleUrls: ['./modal-ver-comentario.component.css']
})
export class ModalVerComentarioComponent implements OnInit {

  @Input() turnoParaVer : any;

  constructor() { }

  ngOnInit(): void {
  }

}
