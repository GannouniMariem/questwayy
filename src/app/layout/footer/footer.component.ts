import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';
import { NewsletterService } from 'src/app/services/newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private cat: CategorieService , private newsletter: NewsletterService) { }
  categories: any;

  news = {
    email: ''
  }


  ajout(){
    this.newsletter.addNewsLetter(this.news).subscribe(
      res=>{
        this.news = {
          email: ''
        }
      }
    );
  }

  ngOnInit(): void {

    this.cat.getAllSousCategorie().subscribe(
      res=>{
        this.categories = res;
      }
    );

  }

}
