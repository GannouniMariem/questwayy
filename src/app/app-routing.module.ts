import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllcoursesComponent } from './allcourses/allcourses.component';
import { BlogComponent } from './blog/blog.component';
import { DetailComponent } from './detail/detail.component';
import { DetailarticleComponent } from './detailarticle/detailarticle.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthGuard } from './guards/auth.guard';
import { InstructorComponent } from './instructor/instructor.component';
import { LoginComponent } from './login/login.component';
import { PanierComponent } from './panier/panier.component';
import { PayedComponent } from './payed/payed.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'programs/:categorie', loadChildren: () => import('./programms/programms.module').then(m => m.ProgrammsModule) },
  { path: 'support', loadChildren: () => import('./support/support.module').then(m => m.SupportModule) },
  { path: 'detail/:titre/:id' , component: DetailComponent },
  // { path: 'article/:id', component: DetailarticleComponent  } ,
  { path: 'profile' , canActivate: [AuthGuard] , component: ProfileComponent },
  { path: 'instructor/:name/:id' , component: InstructorComponent },

  { path: 'panier' , component: PanierComponent },
  { path: 'success' , component: PayedComponent },

  // { path: 'blogs' , component: BlogComponent},
  // { path: 'courses/:cat/:sub' , component: AllcoursesComponent },
  // { path: 'courses' , component: AllcoursesComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword' , component: ForgotComponent},
  { path: 'resetpassworduser/:id/:token'  , component: ResetComponent},

  { path: 'result/:key'  , component: ResultComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
