import { Component, Input, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/services/endpoint.service';
import { FormateurService } from 'src/app/services/formateur.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor( private _formatteur: FormateurService , public endpoint: EndpointService ) { }
  @Input() id;

  formatteur: any;

  ngOnInit(): void {
    console.log(this.id);

    this._formatteur.getformatteurbyid(this.id).subscribe(
      res=>{
        this.formatteur = res;
        console.log(res);

      }
    );

  }

}
