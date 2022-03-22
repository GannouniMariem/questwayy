import { Component, HostListener, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EndpointService } from 'src/app/services/endpoint.service';
import { TemoignageService } from 'src/app/services/temoignage.service';

@Component({
  selector: 'app-temoignage',
  templateUrl: './temoignage.component.html',
  styleUrls: ['./temoignage.component.scss']
})
export class TemoignageComponent implements OnInit {

 
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 2
      }
    },
    nav: true
  }


  screenWidth= 0;


  temoinages: any;

  constructor(private _temoinage: TemoignageService,public endpoint: EndpointService)
  {
    this.screenWidth = window.innerWidth;
   }

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      
      this.screenWidth = window.innerWidth;
  
      
      
    }

  ngOnInit(): void {

    this._temoinage.getAll().subscribe(
      res=>{
        this.temoinages = res;
       
      }
    );

  }
}
