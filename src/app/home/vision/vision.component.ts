import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss']
})
export class VisionComponent implements OnInit {

  constructor( private _categorie: CategorieService ) { }

  categorie: any;

  ngOnInit(): void {

    this._categorie.getCta3().subscribe(
      res=>{
        this.categorie = res;
        
      }
    );
   
  }
}
