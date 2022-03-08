import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgrammsComponent } from './programms.component';

const routes: Routes = [{ path: '', component: ProgrammsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgrammsRoutingModule { }
