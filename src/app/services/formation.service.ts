import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  
  constructor(private http: HttpClient , public path: EndpointService) { }

  private urlformation = this.path.url + '/formation/';



  myFormations = [];
  


  getAllformation(){

    return this.http.get<any>(this.urlformation + "getformation" );
    
  }


  getfeaturedformation(){

    return this.http.get<any>(this.urlformation + "getfeaturedformation" );
    
  }


  getformationById(id: any){

    return this.http.get<any>(this.urlformation +"getformationbyid/" + id);

  }

  gettopformation(cat: any){

    return this.http.get<any>(this.urlformation +"gettopformation/" + cat);

  }

  gettopebook(cat: any){

    return this.http.get<any>(this.urlformation +"gettopebook/" + cat);

  }

  gettoptalks(cat: any){

    return this.http.get<any>(this.urlformation +"gettoptalks/" + cat);

  }


  recherche(key: any){

    return this.http.get<any>(this.urlformation +"recherche/" + key);

  }

  getformationbysouscategorie(cat: any){

    return this.http.get<any>(this.urlformation +"getformationbysouscategorie/" + cat);

  }

  

  getrecomendedformationbycategorie(cat: any){

    return this.http.get<any>(this.urlformation +"getrecomendedformationbycategorie/" + cat);

  }

}
