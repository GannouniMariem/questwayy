import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CoverComponent } from './cover/cover.component';

import { FeaturedComponent } from './featured/featured.component';

import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FaqComponent } from './faq/faq.component';
import { HowitworkComponent } from './howitwork/howitwork.component';
import { QuoteComponent } from './quote/quote.component';
import { VisionComponent } from './vision/vision.component';
import { TemoignageComponent } from './temoignage/temoignage.component';


@NgModule({
  declarations: [
    HomeComponent,
    CoverComponent,

    FeaturedComponent,

    FaqComponent,
    HowitworkComponent,
    QuoteComponent,
    VisionComponent,
    TemoignageComponent
  ],
  imports: [
 
    CarouselModule,

    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ]
})
export class HomeModule { }
