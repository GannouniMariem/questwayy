import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor( private _categorie: CategorieService ) { }

  categorie: any;

  ngOnInit(): void {

    this._categorie.getCta4().subscribe(
      res=>{
        this.categorie = res;
        
      }
    );
   
  }
}
