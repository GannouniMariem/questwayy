import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from './endpoint.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor(private http: HttpClient,
    private _router: Router , private path: EndpointService) { }

    private _path =  this.path.url +  "/admin/";
    private _pathformatteur =  this.path.url +  "/formatteur/";
    private _pathuser =  this.path.url +  "/user/";







private _loginUrl = this._path + "login";


register(user){
  return this.http.post(this._pathuser + 'adduser' , user );
}

loginUser(user) {
return this.http.post<any>(this._pathuser + 'login', user);
}

logoutUser() {
localStorage.removeItem('token');
this._router.navigate(['/login']);
}

getToken() {
  return localStorage.getItem('token');
}

loggedIn() {
  let token = localStorage.getItem('token');
  if(token){
    return true;
  }else{
    return false;
  }
}



jwtDecode(t) {
 if(t){
  let token = {
    raw:'',
    header:'',
    payload: ''
  };

  let payload : any;
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split('.')[0]));
  payload = JSON.parse(window.atob(t.split('.')[1]));
  return (payload)
 }else return null
}


getUserData(){
    let token = this.getToken();
  
    var decoded = this.jwtDecode(token); 
    
    if (decoded) {
      return decoded.subject; 
    } else return null
}


checkLink(id, token){

 return this.http.get(this._path + 'reset-password/' + id + '/' + token);

}

checkLinkformatteur(id, token){

  return this.http.get(this._pathformatteur + 'reset-password/' + id + '/' + token);
 
 }

 checkLinkuser(id, token){

  return this.http.get(this._pathuser + 'reset-password/' + id + '/' + token);
 
 }

forgotPassword(email){

  return this.http.post(this._path + 'forgot-password' , email);

}

resetPassword(id, token , password){

  return this.http.post(this._path + 'reset-password/' + id + '/' + token , password);

}


resetPasswordformatteur(id, token , password){

  return this.http.post(this._pathformatteur + 'reset-password/' + id + '/' + token , password);

}


resetPassworduser(id, token , password){

  return this.http.post(this._pathformatteur + 'reset-password/' + id + '/' + token , password);

}




updateAccount(id: any , admin: any){

  return this.http.put<any>(this._pathuser +'updateuser/'+ id , admin);

}

getAdminById(id:any){
  return this.http.get(this._path + id);
}

updateUserPhoto(id:any, photo:any){
  return this.http.put(this._pathuser + 'updatephoto/' +id , photo);
}




tokenVerification(){

  return this.http.post('http://127.0.0.1:3000/admin/tokenverification' ,{token: this.getToken()});


}

}
