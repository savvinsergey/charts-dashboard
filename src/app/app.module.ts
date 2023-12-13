import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartComponent } from "./shared/components/chart/chart.component";
import { SensorsListFormComponent } from "./shared/components/sensors-list-form/sensors-list-form.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartComponent,
    SensorsListFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
