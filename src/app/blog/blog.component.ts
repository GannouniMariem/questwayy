import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { CategorieService } from '../services/categorie.service';
import { EndpointService } from '../services/endpoint.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor( private _blog: BlogService, public endpoint:EndpointService, private categorie: CategorieService ) { }


  blogs: any;
  blogToFilter:any;
  categories: any;
  ngOnInit(): void {


    this._blog.getAllblog().subscribe(
      res=>{
        this.blogs = res;
        this.blogToFilter = res;
      }
    );


    this.categorie.getAllCategorie().subscribe(
      res=>{
        this.categories = res;
      }
    );

  }




  countHowManyBlogInThisCategorie(c: any){
    let i = 0;
    for(let b of this.blogToFilter){
      if(b.categorie == c) i++;
    }
    return i;

  }



  filterItem(value) {
    this.blogs = this.blogToFilter.filter(d => {
      return (
        d.titre.toLowerCase().includes(value.toLowerCase()) 
      )
    })
  }

  filterItemByCategorie(value) {
    this.blogs = this.blogToFilter.filter(d => {
      return (
        d.categorie.toLowerCase().includes(value.toLowerCase()) 
      )
    })
  }

}
