import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private auth :AuthService,private routes : Router) { }

  ngOnInit(): void {
  }

  redirectToHome() {
    this.routes.navigate(['/home']);    
  }

  async login(email: string, password: string) {
    try {    
      
      await this.auth.login(email, password);      
      
      // this.listaUsuarios  = [];
      // this.pacientes  = 3;
      // this.medicos  = 2;  
      
    } catch (error: any) {
      this.auth.thrownErrorsLogin(error.code);
    }
  }

}
