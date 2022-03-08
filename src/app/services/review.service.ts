import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor( private http: HttpClient , private endpoint: EndpointService ) { }

  url = this.endpoint.url + '/review/';


  addReview(review:any){

    return this.http.post( this.url + 'addreview' , review );

  }


  getFormationReview(id:any){
    return this.http.get(this.url + 'getreviewbyidformation/'+id);
  }


  updateReview(review: any){

    return this.http.put(this.url + 'updatereview/' + review._id, review);

  }


}
