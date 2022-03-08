import { Component, OnInit } from '@angular/core';
import { PanierService } from './services/panier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontoffice-e-learning';

  constructor(private panier: PanierService){}

  ngOnInit(){
    this.panier.initPanier();
  }
}
