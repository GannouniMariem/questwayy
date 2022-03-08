import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { CommandeService } from 'src/app/services/commande.service';
import { EndpointService } from 'src/app/services/endpoint.service';
import { FormationService } from 'src/app/services/formation.service';
import { PanierService } from 'src/app/services/panier.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private _categorie: CategorieService,
    public _auth: AuthService, 
    public endpoint: EndpointService ,
    private _wish: WishlistService,
    public panier: PanierService,
    private _commande: CommandeService,
    private _formation: FormationService
    ) { }

  categories: any;
  wish: any;
  user: any;
  commandes: any;
  formations = [];
wishlist : any;
  ngOnInit(): void {

        
    this._categorie.getAllSousCategorie().subscribe(
      res=>{
        this.categories = res;
        console.log(res);
        
      }
    );
    
    
    this.user = this._auth.getUserData();


    this._wish.getwishlistById().subscribe(
      res=>{
        this.wish = res;
        this._wish.wishlist = [...this.wish];
     
        if(this._wish.wishlist.length > 0){
          this._wish.getwishlist().subscribe(
            res=>{
              this.wishlist = res;
          
              
              
            }
          );
         }
      }
    );

  
 



    this._commande.getMyCommande(this.user._id).subscribe(
      res=>{
        this.commandes = res;
    

        for(let c of this.commandes){

          for(let f of c.formations){
            this.formations.push(f);
          }

        }
        this._formation.myFormations = [...this.formations];
  

      }
    );


   

  }

}




