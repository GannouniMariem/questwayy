import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient , public path: EndpointService) { }

  private urlblog =  this.path.url +  '/blog/';




  getlatestblog(){

    return this.http.get(this.urlblog + 'getlatestblog');

  }



  getAllblog(){

    return this.http.get<any>(this.urlblog + "getblog" );
    
  }


  getblogFromArchive(){

    return this.http.get<any>(this.urlblog + 'archive/getblogfromarchive');
    
  }


  getblogById(id: any){

    return this.http.get<any>(this.urlblog +"getblogbyid/" + id);

  }



  

}
