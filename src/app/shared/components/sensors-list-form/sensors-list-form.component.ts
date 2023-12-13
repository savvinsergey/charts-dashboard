import {
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,
} from '@angular/core';

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {ChartsDataService} from "../../services/charts-data.service";
import {ISensor} from "../../interfaces/chart-data.interface";

@Component({
  selector: 'app-sensors-list-form',
  standalone: true,
  templateUrl: './sensors-list-form.component.html',
  styleUrls: ['./sensors-list-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SensorsListFormComponent implements OnChanges {
  @Input() list: string[] = [];

  @Output() groupCreated = new EventEmitter<ISensor[]>();

  public selectedSensor = null;
  public sensorsGroup: ISensor[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const list = changes['list']?.currentValue
    if (list?.length) {
      this.selectedSensor = list[0];
    }
  }

  public onAddSensorToGroup() {
    this.sensorsGroup.push({
      name: this.selectedSensor,
      source: new ChartsDataService()
    });
  }

  public onRemoveSensorFromGroup(index: number) {
    this.sensorsGroup.splice(index, 1);
  }

  public onCreateGroup() {
    this.groupCreated.emit([...this.sensorsGroup]);
    this.sensorsGroup = [];
  }
}
