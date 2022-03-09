import { Component, Input, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/services/endpoint.service';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.scss']
})
export class MycoursesComponent implements OnInit {

  constructor( private _formation: FormationService , public endpoint: EndpointService ) { }
  @Input() id;

  formations: any;

  ngOnInit(): void {
    console.log(this.id);

    this._formation.getformationByIdFormatteur(this.id).subscribe(
      res=>{
        this.formations = res;
      }
    );
  }

}
