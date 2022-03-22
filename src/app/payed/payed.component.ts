import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../services/commande.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-payed',
  templateUrl: './payed.component.html',
  styleUrls: ['./payed.component.scss']
})
export class PayedComponent implements OnInit {

  constructor( private _commande: CommandeService , private router: Router , private panier: PanierService ) { }

  orderId = '';
  success = true;
  free = true;
  order : any;
  ngOnInit(): void {
    this.panier.viderPanier();
    this.orderId = localStorage.getItem('orderId');
    if(this.orderId && this.orderId.length > 0){

      this._commande.getCommandeById(this.orderId).subscribe(
        res=>{
          this.order = res;
          if(this.order.access){
            this.success = true
            if(this.order.prix == 0){
              this.free = true;
            }else{
              this.free = false
            }
          }else{
            this.success = false;

          }



        },
        err=>{
          this.success = false;
        }
      );

    }else{
      this.router.navigate(['/panier']);
    }

  }

}
