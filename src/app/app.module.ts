import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherModule } from './weather/weather.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NewsModule } from './news/news.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    WeatherModule,
    NotificationsModule,
    NewsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
