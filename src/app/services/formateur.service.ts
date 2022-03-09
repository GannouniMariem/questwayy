import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(private http: HttpClient , private endpoint: EndpointService) { }


  getformatteurbyid(id:any){
    return this.http.get(this.endpoint.url + '/formatteur/getformatteurbyid/' + id);
  }


}
