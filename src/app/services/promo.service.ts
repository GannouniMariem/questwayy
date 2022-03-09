import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private http:HttpClient , private endpoint : EndpointService) { }

  verifCode(code: any){
    return this.http.post(this.endpoint.url + '/commande/verifycode' , code);
  }


}
