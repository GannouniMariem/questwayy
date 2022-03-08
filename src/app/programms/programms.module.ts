import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgrammsRoutingModule } from './programms-routing.module';
import { ProgrammsComponent } from './programms.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    ProgrammsComponent
  ],
  imports: [
    CarouselModule,
    CommonModule,
    ProgrammsRoutingModule
  ]
})
export class ProgrammsModule { }
