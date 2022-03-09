import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EndpointService } from '../services/endpoint.service';
import { PanierService } from '../services/panier.service';
import Swal from 'sweetalert2';
import { CommandeService } from '../services/commande.service';
import { PromoService } from '../services/promo.service';
import { Router } from '@angular/router';

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
    private _commande: CommandeService,
    private _promo: PromoService,
    private router: Router
    ) { }


  step1 = false;
  totalPrice = 0;
  code = {
    code: ''
  }

  commande = {


    idFormation: [],
    adress: '',
    tel: '',
    poste: '',
    code: ''

  }


  testAdress = false;
  testTel = false;
  testPoste = false;
  testCode = false;

  testApplyed = false;



  ngOnInit(): void {
    this.calculTotal()
  }



  calculTotal(){
    let total = 0;
    for(let p of this.panier.panier.panier){
      total += p.newprix ? parseFloat( p.newprix ): parseFloat( p.prix );
    }

    this.totalPrice = total;

  }




  resultOfSaveCommande : any;
  myresponse: any;

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


    if(this._auth.loggedIn()){


      for(let p of this.panier.panier.panier){

        this.commande.idFormation.push(p._id);

      }

      if (countError === 0) {
        this.commande.code = this.code.code;
        if(this.totalPrice > 0){
          this._commande.passer(this.commande).subscribe(
            res=>{
              Swal.fire('Verified', 'Success .. ...... .......!', 'success');

              this.commande = {

                idFormation: [],
                adress: '',
                tel: '',
                poste: '',
                code: ''

              }

              this.resultOfSaveCommande = res;
              localStorage.setItem('orderId' , this.resultOfSaveCommande._id);

              window.location.href = 'https://api.questwaycompany.com/paiment/' + this.resultOfSaveCommande._id;



            }
          );
        }else{
          this._commande.passerFree(this.commande).subscribe(
            res=>{

              this.commande = {
                idFormation: [  ],
                adress:'',
                tel:'',
                poste:'',
                code:''
              }
              this.myresponse = res;
              localStorage.setItem('orderId' , this.myresponse._id);
              this.router.navigate(['/success'])
            },
            err=>{
              console.log(err);

            }
          );
        }


      }

    }else{

      Swal.fire('Oops...', 'Login to your account first!', 'error')

    }






  }
  testCodeResponse: any;
  validate(){
    this.testCode = false;
    if(this.code.code.length == 0){
      this.testCode = true;
    }else{
      this._promo.verifCode(this.code).subscribe(
        res=>{
          this.testCodeResponse = res;
          console.log(res);

          if(this.testCodeResponse.message == 'success'){
            let total = 0;
            for(let p of this.panier.panier.panier){

              for(let f of this.testCodeResponse.code.formations){
                if(p._id == f._id){
                  total += p.newprix ? parseFloat( p.newprix ) - (parseFloat( p.newprix ) * parseFloat(this.testCodeResponse.code.percent) ) / 100:  parseFloat( p.prix ) - ( parseFloat( p.prix ) * parseFloat(this.testCodeResponse.code.percent) ) / 100;
                } else{
                   total += p.newprix ? parseFloat( p.newprix ): parseFloat( p.prix );

                }

              }


            }

            this.totalPrice = total;
            this.testApplyed = true;

          }

        },
        err=>{
          console.log(err);

        }
      );
    }
  }


}
