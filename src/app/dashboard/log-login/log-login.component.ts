import { Component, OnInit } from '@angular/core';
import { Logs } from 'src/app/interfaces/logs';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-login',
  templateUrl: './log-login.component.html',
  styleUrls: ['./log-login.component.css']
})
export class LogLoginComponent implements OnInit {
  todosLosLogs : Logs[] =[]
  displayedColumns: string[] = ['email', 'fecha'];

  constructor(private logServ : LogService) { }

  ngOnInit(): void {
    this.cargarLosLogs();
  }

  cargarLosLogs(){
    this.logServ.traerLogs().subscribe(
      logs=>{
        this.todosLosLogs = logs;
      }
    )
  }
}
