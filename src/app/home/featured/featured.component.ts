import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { EndpointService } from 'src/app/services/endpoint.service';
import { FormationService } from 'src/app/services/formation.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }





  formations: any;

  constructor(private _formation: FormationService,public endpoint: EndpointService, public _wish: WishlistService, private _auth: AuthService, private _categorie: CategorieService) { }

  categorie: any;

  ngOnInit(): void {

    this._formation.getfeaturedformation().subscribe(
      res=>{
        this.formations = res;
       
      }
    );

    this._categorie.getCta2().subscribe(
      res=>{
        this.categorie = res;
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
          }else{
            console.log(this.newWish);
  
            this._wish.wishlist.push(this.newWish.id);
  
          }
         
          
        }
      );
    }else{
      Swal.fire('Oops...', 'Login to your account first!', 'error')
    }

  



  }





}
