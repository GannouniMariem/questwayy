import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CategorieService } from '../services/categorie.service';
import { EndpointService } from '../services/endpoint.service';
import { FormationService } from '../services/formation.service';
import { WishlistService } from '../services/wishlist.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.scss']
})
export class AllcoursesComponent implements OnInit {

  constructor( private _categorie: CategorieService, private _formation: FormationService, public endpoint: EndpointService,  public _wish: WishlistService, private _auth: AuthService , private route: ActivatedRoute) { }


  formations: any;
  filterFormations: any;

  categories: any;
  subcategorie: any;
  selectedCategorie = '';
  selectedSubCategorie = '';


  display = true;

  cat : any;
  subcat: any;

  ngOnInit(): void {

    this.cat = this.route.snapshot.params.cat;
    this.subcat = this.route.snapshot.params.sub;
    this._formation.getAllformation().subscribe(
      res=>{
        this.formations = res;
        this.filterFormations = res;

        if(this.cat){
          this.filterItemByCategorie(this.cat);
        }

        if(this.subcat){
          this.filterItemBySubCategorie(this.subcat);
        }
      }
    );


    this._categorie.getAllCategorie().subscribe(
      res=>{
        this.categories = res;
      }
    );

    this._categorie.getAllSousCategorie().subscribe(
      res=>{
        this.subcategorie = res;
      }
    );





  }



  filterItem(value) {
    this.formations = this.filterFormations.filter(d => {
      return (
        d.titre.toLowerCase().includes(value.toLowerCase()) 
      )
    })
  }

  filterItemByCategorie(value) {
    this.selectedCategorie = value;
    
    this.formations = this.filterFormations.filter(d => {
      return (
        d.categorie.toLowerCase().includes(this.selectedCategorie.toLowerCase()) &&
        d.souscategorie.toLowerCase().includes(this.selectedSubCategorie.toLowerCase())

      )
    })
  }

  filterItemBySubCategorie(value) {
    this.selectedSubCategorie = value;
    this.formations = this.filterFormations.filter(d => {
      return (
        d.categorie.toLowerCase().includes(this.selectedCategorie.toLowerCase()) &&
        d.souscategorie.toLowerCase().includes(this.selectedSubCategorie.toLowerCase()) 
      )
    })
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
