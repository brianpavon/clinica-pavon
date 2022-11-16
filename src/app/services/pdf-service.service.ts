import { Injectable } from '@angular/core';
import { HistoriaClinica } from '../interfaces/historia-clinica';
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
    let dataHistoria = this.crearHeader(paciente.historiaClinica);
    //console.log(dataHistoria);
    
    this.TDocumentDefinitions = {
      content: [
        {
          text: 'Clínica La Online',
          style: 'header'
        },
        {
          // you can also fit the image inside a rectangle
          image:await this.getBase64ImageFromURL(this.logoClinica) ,
          fit: [100, 100],
          style:'imagen'
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: `Historia Clínica: ${paciente.apellido} ${paciente.nombre}`, style: 'subheader'}
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 'auto', 'auto', 'auto', 'auto' ],
    
            body: [  
              [ 'Altura', 'Peso', 'Presion', 'Temperatura' ],
              [  paciente.historiaClinica?.altura, paciente.historiaClinica?.peso, paciente.historiaClinica?.presion, paciente.historiaClinica?.temperatura ]
            ]
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: dataHistoria.widthDinamico,
    
            body: [  
              dataHistoria.headerDinamico,
              dataHistoria.valuesDinamico
            ]
          }
        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.anioActual,
          style: 'subheader'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          // margin: [left, top, right, bottom]
          margin: [0,0,0,20]
        },
        imagen:{
          margin: [0,0,0,20]
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0,20,0,20]
        }
      }
      
    }

    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download(`historiaClinica-${paciente.apellido}-${paciente.nombre}`);
  }

  async descargarTurnosPaciente(turnosPaciente : Turnos[]){
    let columns = this.setearColumnas(turnosPaciente);
    this.TDocumentDefinitions = {
      content: [
        {
          text: 'Clínica La Online',
          style: 'header'
        },
        {
          // you can also fit the image inside a rectangle
          image:await this.getBase64ImageFromURL(this.logoClinica) ,
          fit: [100, 100],
          style:'imagen'
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: `Detalle de turnos del paciente: ${turnosPaciente[0].paciente.apellido} ${turnosPaciente[0].paciente.nombre}`, style: 'subheader'}
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
          style: 'subheader'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          // margin: [left, top, right, bottom]
          margin: [0,0,0,20]
        },
        imagen:{
          margin: [0,0,0,20]
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0,20,0,20]
        }
      }
      
    }

    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download(`turnos-${turnosPaciente[0].paciente.apellido}-${turnosPaciente[0].paciente.nombre}`);
  }

  async descargarGraficoBar(urlGrafico : string,nombreGrafico:string){
    this.TDocumentDefinitions = {
      content: [
        {
          text: 'Clínica La Online',
          style: 'header'
        },
        {
          // you can also fit the image inside a rectangle
          image:await this.getBase64ImageFromURL(this.logoClinica) ,
          fit: [100, 100],
          style:'imagen'
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: `${nombreGrafico}`, style: 'subheader'}
          }
        },
        {
          // you can also fit the image inside a rectangle
          image:urlGrafico,          
          width:400,
          height:300
        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.anioActual,
          style: 'subheader'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          // margin: [left, top, right, bottom]
          margin: [0,0,0,20]
        },
        imagen:{
          margin: [0,0,0,20]
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0,20,0,20]
        }
      }
      
    }
    //console.log(nombreGrafico.toLocaleLowerCase().replace(' ','-').replace(' ','-'));
    
    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download(`grafico-${nombreGrafico.toLocaleLowerCase().replace(' ','-').replace(' ','-')}`);
  }

  async descargarGraficoRedondos(urlGrafico : string,nombreGrafico:string){
    this.TDocumentDefinitions = {
      content: [
        {
          text: 'Clínica La Online',
          style: 'header'
        },
        {
          // you can also fit the image inside a rectangle
          image:await this.getBase64ImageFromURL(this.logoClinica) ,
          fit: [100, 100],
          style:'imagen'
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: `${nombreGrafico}`, style: 'subheader'}
          }
        },
        {
          // you can also fit the image inside a rectangle
          image:urlGrafico,          
          width:300,
          height:300
        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.anioActual,
          style: 'subheader'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          // margin: [left, top, right, bottom]
          margin: [0,0,0,20]
        },
        imagen:{
          margin: [0,0,0,20]
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0,20,0,20]
        }
      }
      
    }
    //console.log(nombreGrafico.toLocaleLowerCase().replace(' ','-').replace(' ','-'));
    
    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download(`grafico-${nombreGrafico.toLocaleLowerCase().replace(' ','-').replace(' ','-').replace(' ','-')}`);
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
        {text:this.inicialMayuscula(t.estado)}
      ])
    }
    return tableData;
  }

  inicialMayuscula(str:string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  crearHeader(historiaClinica:HistoriaClinica | undefined){
    
    let arrayHeaderDinamico = [];
    let arrayValuesDinamico = [];    
    let arrayWidthDinamico = [];

    for (const key in historiaClinica) {
      if(key == 'datosDinamicos'){          
        for (const clave in historiaClinica[key]){
          arrayHeaderDinamico.push(this.inicialMayuscula(clave))
          arrayValuesDinamico.push(historiaClinica[key][clave as keyof HistoriaClinica])
        }          
      }
    }
    
    for (let i = 0; i < arrayHeaderDinamico.length; i++) {
      arrayWidthDinamico.push('auto');
      
    }
    return {      
      headerDinamico:arrayHeaderDinamico,      
      valuesDinamico:arrayValuesDinamico,      
      widthDinamico: arrayWidthDinamico
    };
  }


}
