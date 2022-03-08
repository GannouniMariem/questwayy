import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginUserData = {
    nom:'',
    email: '',
    password: ''

  };
  nomAlert = false;
  prenomAlert = false;

  emailAlert = false;
  passwordAlert = false;


  user : any;
  alert = false;
  load = false;
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {

    if(this._auth.loggedIn()){
      this._router.navigate(['/']);
    }
    
  }


  validateEmail(sEmail) {
    var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
  
    if(!sEmail.match(reEmail)) {
    
      return false;
    }
  
    return true;
  
  }

  resp: any;

  loginUser() {


    this.emailAlert = false;
    this.passwordAlert = false;
    this.nomAlert = false;
   

  if(this.validateEmail(this.loginUserData.email) && this.loginUserData.password.length >0 && this.loginUserData.nom.length > 0){

    this.load = true;

    this._auth.register(this.loginUserData)
    .subscribe(
      res => {
        this.resp = res;
        this.load = false;
        localStorage.setItem('token', this.resp.token);

        this._router.navigate(['/']);
      
      },
      err => {

        this.alert = true;

        setTimeout(
          ()=>{
            this.alert = false
          }, 4000
        );


      }
    )

  } 
  
  
  if (!this.validateEmail(this.loginUserData.email)){

    this.emailAlert = true

  }

  if (this.loginUserData.password.length === 0){

    this.passwordAlert = true

  }


  if (this.loginUserData.nom.length === 0){

    this.nomAlert = true

  }

  

  }
}
