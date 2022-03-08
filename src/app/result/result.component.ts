import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndpointService } from '../services/endpoint.service';
import { FormationService } from '../services/formation.service';
import { WishlistService } from '../services/wishlist.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(
    private _wish: WishlistService,
    private _auth: AuthService,
    private act: ActivatedRoute , private _formation: FormationService , public path: EndpointService) { }

  formations: any;
  key: any;
  ngOnInit(): void {
    this.key = this.act.snapshot.paramMap.get('key');
    this._formation.recherche(this.key).subscribe(
      res=>{
        this.formations = res;
      }

    );
  }
  newWish : any;
  addToWishList(idF:any){

    if(this._auth.loggedIn()){
      this._wish.addWishList(idF).subscribe(
        res=>{
          this.newWish = res;
          
          if(this.newWish.stat == 'deleted'){
            console.log(this.newWish);
  
            this._wish.wishlist.splice( this._wish.wishlist.indexOf(this.newWish.id) ,1);
            this.ngOnInit();
          }else{
            console.log(this.newWish);
  
            this._wish.wishlist.push(this.newWish.id);
            this.ngOnInit(); 
          }
         
          
        }
      );
    }else{
      Swal.fire('Oops...', 'Login to your account first!', 'error')
    }

  


  }

}
