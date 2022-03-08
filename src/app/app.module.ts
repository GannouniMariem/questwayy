import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetailComponent } from './detail/detail.component';
import { PanierComponent } from './panier/panier.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { DetailarticleComponent } from './detailarticle/detailarticle.component';
import { BlogComponent } from './blog/blog.component';
import { AllcoursesComponent } from './allcourses/allcourses.component';
import { InterceptorService } from './services/interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InstructorComponent } from './instructor/instructor.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PayedComponent } from './payed/payed.component';
import { ResultComponent } from './result/result.component';
import { AboutComponent } from './instructor/about/about.component';
import { MycoursesComponent } from './instructor/mycourses/mycourses.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    DetailComponent,
    PanierComponent,
    ProfileComponent,
    DetailarticleComponent,
    BlogComponent,
    AllcoursesComponent,
    InstructorComponent,
    NotfoundComponent,
    PayedComponent,
    ResultComponent,
    AboutComponent,
    MycoursesComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
