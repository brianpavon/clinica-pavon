import { Injectable } from '@angular/core';
import { Turnos } from '../interfaces/turnos';
import { Usuarios } from '../interfaces/usuarios';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {
  fecha = new Date();
  hoy:any = this.fecha.getDate();
  mesActual:any = this.fecha.getMonth() + 1
  anioActual = this.fecha.getFullYear()
  logoClinica : string = '/assets/images/logo-clinica.png'


  TDocumentDefinitions: any;

  constructor() { }

  async descargarHistClinica(paciente : Usuarios){
    
    this.TDocumentDefinitions = {
      content: [
        {
          // you can also fit the image inside a rectangle
          image:await this.getBase64ImageFromURL(this.logoClinica) ,
          fit: [100, 100]
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: `Historia Clínica: ${paciente.apellido} ${paciente.nombre}`, style: 'header'}
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
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.anioActual,
          style: 'header'
        }
      ]
      
    }

    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download();
  }

  async descargarTurnosPaciente(turnosPaciente : Turnos[]){
    let columns = this.setearColumnas(turnosPaciente);
    this.TDocumentDefinitions = {
      content: [
        {
          // you can also fit the image inside a rectangle
          image:await this.getBase64ImageFromURL(this.logoClinica) ,
          fit: [100, 100]
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: `Detalle de turnos del paciente: ${turnosPaciente[0].paciente.apellido} ${turnosPaciente[0].paciente.nombre}`, style: 'header'}
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 'auto', 'auto', 'auto', 'auto','auto' ],
    
            body: [
              [ 'Especialista', 'Especialidad', 'Fecha', 'Hora','Estado'],
              ...columns
            ]
          }
        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.anioActual,
          style: 'header'
        }
      ]
      
    }

    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download();
    

  }


  getBase64ImageFromURL(url:string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
  
        var dataURL = canvas.toDataURL("image/png");
  
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }


  setearColumnas(turnos:Turnos[]){
    let tableData = [];

    for (const t of turnos) {
      tableData.push([
        {text:`${t.medico.nombre} ${t.medico.apellido}`},
        {text: `${t.especialidad}`},
        {text:t.fecha},
        {text:t.horario},
        {text:this.capitalizeFirstLetter(t.estado)}
      ])
    }
    return tableData;
  }

  capitalizeFirstLetter(str:string) {
    return str[0].toUpperCase() + str.slice(1);
  }


}
