import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { EndpointService } from '../services/endpoint.service';

@Component({
  selector: 'app-detailarticle',
  templateUrl: './detailarticle.component.html',
  styleUrls: ['./detailarticle.component.scss']
})
export class DetailarticleComponent implements OnInit {

  constructor( private _blog: BlogService, public endpoint:EndpointService, private route: ActivatedRoute ) { }


  blog: any;
  id: any;

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;

    this._blog.getblogById(this.id).subscribe(
      res=>{
        this.blog = res;
        console.log(res);
        
      }
    );

  }

}
