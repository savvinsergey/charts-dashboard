import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartComponent } from "./shared/components/chart/chart.component";
import { SensorsListFormComponent } from "./shared/components/sensors-list-form/sensors-list-form.component";
import { DrawerComponent } from "./shared/components/drawer/drawer.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TooltipForDisabledBtnDirective } from "./shared/directives/tooltip-for-disabled-btn.directive";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbTooltipModule,
    ChartComponent,
    DrawerComponent,
    SensorsListFormComponent,
    TooltipForDisabledBtnDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
