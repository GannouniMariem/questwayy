import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EndpointService } from 'src/app/services/endpoint.service';
import { FormationService } from 'src/app/services/formation.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.scss']
})
export class MycoursesComponent implements OnInit {

  constructor( 
    private _formation: FormationService , 
    public endpoint: EndpointService ,
    public _wish: WishlistService, 
    private _auth: AuthService
    ) { }
  @Input() id;

  formations: any;

  ngOnInit(): void {
    console.log(this.id);

    this._formation.getformationByIdFormatteur(this.id).subscribe(
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
