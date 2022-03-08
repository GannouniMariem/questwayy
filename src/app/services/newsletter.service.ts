import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient,private endpoint: EndpointService) { }


  addNewsLetter(news: any){
    return this.http.post(this.endpoint.url + '/newslatter/addnewslatter' , news)
  }

}
