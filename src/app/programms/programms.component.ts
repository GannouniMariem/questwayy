import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { EndpointService } from '../services/endpoint.service';
import { FormationService } from '../services/formation.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-programms',
  templateUrl: './programms.component.html',
  styleUrls: ['./programms.component.scss']
})
export class ProgrammsComponent implements OnInit {

  constructor(

    private route: ActivatedRoute,
    private _categorie: CategorieService,
    private _formation: FormationService,
    public endpoint: EndpointService,
    private _wish: WishlistService,
    private _auth: AuthService

  ) { }


  categorie:any;
  formations:any;  
  categories: any;
  
  formationsbycat = [];
  ngOnInit(): void {

    this.categorie = this.route.snapshot.paramMap.get('categorie');

    this._categorie.getAllCategorie().subscribe(
      res=>{
        this.categories = res;
        this._formation.getformationbysouscategorie(this.categorie).subscribe(
          res=>{
            this.formationsbycat = res;
    
         
    
          }
        );
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
