import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient , public path: EndpointService , private _auth: AuthService) { }

  private urlwishlist = this.path.url +'/wishlist/';
  private urlformation = this.path.url +'/formation/';



  public wishlist = [];
  public wishlisttodisplay = [];



  addWishList(wish){
    let newwish = {
      idUser: this._auth.getUserData()._id,
      idFormation: wish

    }
    return this.http.post(this.urlwishlist + 'addwishlist' , newwish);
  }


  getAllwishlist(){

    return this.http.get<any>(this.urlwishlist + "getwishlist" );
    
  }


  getwishlistFromArchive(){

    return this.http.get<any>(this.urlwishlist + 'archive/getwishlistfromarchive');
    
  }


  getwishlistById(){

    return this.http.get<any>(this.urlwishlist +"getwishlistbyidUser/" + this._auth.getUserData()?._id);

  }



  getwishlist(){

    return this.http.get<any>(this.urlformation +"getwishformation/" + this.wishlist);

  }

}
