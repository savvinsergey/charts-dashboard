import {Component, inject} from '@angular/core';
import {CSensorsList} from "./shared/constants/sensors-list.const";
import {ISensor} from "./shared/interfaces/chart-data.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly sensorsList = CSensorsList;

  public sensorGroups: ISensor[][] = [];

  public onGroupCreated(sensorsGroup: ISensor[]) {
    this.sensorGroups.push(sensorsGroup)
  }
}
