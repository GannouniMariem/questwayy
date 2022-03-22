import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class TemoignageService {

  constructor( private http: HttpClient , private endpoint: EndpointService ) { }

  url = this.endpoint.url + '/temoinage/';


  getAll(){
    return this.http.get(this.url + 'gettemoinage');
  }

}
