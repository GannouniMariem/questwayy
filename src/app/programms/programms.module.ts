import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgrammsRoutingModule } from './programms-routing.module';
import { ProgrammsComponent } from './programms.component';


@NgModule({
  declarations: [
    ProgrammsComponent
  ],
  imports: [
    CommonModule,
    ProgrammsRoutingModule
  ]
})
export class ProgrammsModule { }
