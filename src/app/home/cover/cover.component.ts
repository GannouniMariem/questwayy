import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategorieService } from 'src/app/services/categorie.service';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {


  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  }




  constructor( private _categorie: CategorieService, public endpoint: EndpointService ) { }

  categories: any;

  ngOnInit(): void {

    this._categorie.getAllCategorie().subscribe(
      res=>{
        this.categories = res;
      }
    );

  }

}
