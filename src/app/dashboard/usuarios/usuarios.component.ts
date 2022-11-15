import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/interfaces/historia-clinica';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'rol' ,'dni', 'email','estado'];
  todosLosUsuarios :Usuarios[] = [];
  histClinPaciente !: HistoriaClinica;

  fecha = new Date();
  hoy:any = this.fecha.getDate();
  mesActual:any = this.fecha.getMonth() + 1
  añoActual = this.fecha.getFullYear()

  TDocumentDefinitions: any;
  

  constructor(private userServ:UsuariosService,private imgServ : ImagenService) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(){
    this.userServ.traerUsuarios().subscribe(
      usuarios=>{
        this.todosLosUsuarios = usuarios;
        this.todosLosUsuarios.forEach(
          usuario=>{
            this.imgServ.descargarImagen(usuario.fotoPerfil).subscribe(
              url=>{
                usuario.fotoPerfil = url;
              }
            )
          }
        )
        //console.log(this.todosLosUsuarios);
        
      }
    );
  }


  verHistClin(histClin:HistoriaClinica){
    this.histClinPaciente = histClin;
  }

  bajarInfoAtencion(paciente:Usuarios){
  
    this.TDocumentDefinitions = {
      content: [
        {
          // you can also fit the image inside a rectangle
          image:'snow' ,
          fit: [100, 100]
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: 'TITULO: HISTORIAL CLINICO', style: 'header'}
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
    
            body: [  
              [ 'Altura', 'Peso', 'Presion', 'Temperatura' ],
              [  paciente.historiaClinica?.altura, paciente.historiaClinica?.peso, paciente.historiaClinica?.presion, paciente.historiaClinica?.temperatura ]
            ]
          }
        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.añoActual,
          style: 'header'
        }
      ],
      images: {
        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
        snow: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
  
      }
    }

    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download();
    
  }
}
