import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EndpointService } from '../services/endpoint.service';
import { PanierService } from '../services/panier.service';
import Swal from 'sweetalert2';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  constructor(
    public panier: PanierService,
    public endpoint: EndpointService,
    public _auth: AuthService,
    private _commande: CommandeService
    ) { }


  step1 = false;  


  commande = {

    idUser: '',
    idFormation: [],
    date: '',
    prix: 0,
    access: false,
    adress: '',
    tel: '',
    poste: ''

  }  


  testAdress = false;
  testTel = false;
  testPoste = false;

  

  ngOnInit(): void {
  }



  calculTotal(){
    let total = 0;
    for(let p of this.panier.panier.panier){
      total += p.newprix ? parseInt( p.newprix ): parseInt( p.prix ); 
    }

    return total;

  }




  procced(){

    if(this._auth.loggedIn()){
      this.commande.idUser = this._auth.getUserData()._id;

      for(let p of this.panier.panier.panier){

        this.commande.idFormation.push(p._id);

      }
      this.commande.prix = this.calculTotal();

      this.step1 =  true;

    }else{

      Swal.fire('Oops...', 'Login to your account first!', 'error')

    }

  }




  checkout(){


    this.testAdress = false;
    this.testTel = false;

    this.testPoste = false;


    let countError = 0;

    if (this.commande.adress.length == 0) {
      this.testAdress = true;
      countError++;
    }

    if (this.commande.tel.length == 0) {
      this.testTel= true;
      countError++;
    }


    if (this.commande.poste.length == 0) {
      this.testPoste= true;
      countError++;
    }

    if (countError === 0) {

      this._commande.passer(this.commande).subscribe(
        res=>{
          Swal.fire('Verified', 'Success .. ...... .......!', 'success');
          this.panier.viderPanier();
          this.commande = {

            idUser: '',
            idFormation: [],
            date: '',
            prix: 0,
            access: false,
            adress: '',
            tel: '',
            poste: ''
        
          }
        }
      );


    }



  }




}
