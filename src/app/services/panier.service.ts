import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormationService } from './formation.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor(private http:HttpClient , private _formation: FormationService) { }

  formation: any;

  panier = {
    panier: []
  }

  initPanier(){

    let p = localStorage.getItem('panier');

    if(p){
      this.panier = JSON.parse(p);

      this._formation.getformationtoupdatepanier().subscribe(
        res=>{
          this.formation = res;

          for(let f of this.formation){
            for(let fp  of this.panier.panier){

              if(f._id == fp._id){

                  fp.prix = f.prix;
                  fp.newprix = f.newprix;


              }


            }
          }

        }
      );



    } else {

      localStorage.setItem('panier' , JSON.stringify(this.panier));

    }

  }


  ajoutProduitAuPanier(produit:any){
    this.initPanier();

      let index = this.panier.panier.findIndex(x => x._id === produit._id);
      if(index == -1){
        this.panier.panier.push(produit);

        localStorage.setItem('panier' , JSON.stringify(this.panier));

        this.initPanier();
      }



  }

  supprimerProduitPanier(produit:any){

    let i = this.panier.panier.indexOf(produit);
    this.panier.panier.splice(i , 1);

    localStorage.setItem('panier' , JSON.stringify(this.panier));

    this.initPanier();


  }


  viderPanier(){
    this.panier.panier = [];

    localStorage.setItem('panier' , JSON.stringify(this.panier));

    this.initPanier();

  }






}
