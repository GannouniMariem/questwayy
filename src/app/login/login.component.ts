import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService  } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {

    email: '',
    password: ''

  };

  emailAlert = false;
  passwordAlert = false;
  load = false;


  user : any;
  alert = false;
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


  loginUser() {

    this.emailAlert = false;
    this.passwordAlert = false;

  if(this.validateEmail(this.loginUserData.email) && this.loginUserData.password.length >0){
    this.load = true;

    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.load = false;
        window.location.href = "https://questwaycompany.com"
      
      },
      err => {
        this.load = false;
        
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


  }

}