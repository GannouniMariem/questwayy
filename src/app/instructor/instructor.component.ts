import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute) { }

  id: any;

  ngOnInit(): void {

    this.id = this.actRoute.snapshot.paramMap.get('id');

  }

}
