import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor( private http: HttpClient , private endpoint: EndpointService ) { }

  url = this.endpoint.url + '/categorie/';
  sous = this.endpoint.url + '/souscategorie/';




  getAllCategorie(){
    return this.http.get(this.url + 'getcategorie' );
  }





  getOneCategorie(id: any){

    return this.http.get(this.url + 'getcategoriebyid/' + id );

  }













 

  getAllSousCategorie(){
    return this.http.get(this.sous + 'getsouscategorie' );
  }






  getOneSousCategorie(id: any){

    return this.http.get(this.sous + 'getsouscategoriebyid/' + id );

  }


  getCta1(){

    return this.http.get(this.sous + 'cta1/'  );

  }

  getCta2(){

    return this.http.get(this.sous + 'cta2/'  );

  }

  getCta3(){

    return this.http.get(this.sous + 'cta3/'  );

  }

  getCta4(){

    return this.http.get(this.sous + 'cta4/'  );

  }







}
