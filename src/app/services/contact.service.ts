import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor( private http: HttpClient , private endpoint: EndpointService ) { }

  url = this.endpoint.url + '/contact/';


  send(message:any){

    return this.http.post( this.url , message );

  }


}
