import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechNewsComponent } from './tech-news/tech-news.component';
import { WorldNewsComponent } from './world-news/world-news.component';



@NgModule({
  declarations: [TechNewsComponent, WorldNewsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TechNewsComponent,
    WorldNewsComponent
  ]
})
export class NewsModule { }
