import {
  ChangeDetectionStrategy,
  Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges,
} from '@angular/core';

import { CommonModule } from "@angular/common";
import {FormArray, FormControl, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import { ChartsDataService } from "../../services/charts-data.service";
import { ISensor } from "../../interfaces/sensor.interface";
import { v4 as uuidv4 } from 'uuid';
import {ISensorsGroup} from "../../interfaces/sensors-group.interface";

@Component({
  selector: 'app-sensors-list-form',
  standalone: true,
  templateUrl: './sensors-list-form.component.html',
  styleUrls: ['./sensors-list-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SensorsListFormComponent implements OnChanges {
  private readonly fb = inject(NonNullableFormBuilder);

  // -------------------------- //

  @Input() list: string[] = [];

  @Output() created = new EventEmitter<ISensorsGroup>();

  public form = this.fb.group({
    selectedSensor: this.fb.control<string | null>(null),
    sensorsGroup: this.fb.array<ISensor>([])
  })

  get selectedSensorControl() {
    return this.form.get('selectedSensor') as FormControl;
  }

  get sensorsGroupControl() {
    return this.form.get('sensorsGroup') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const list = changes['list']?.currentValue
    if (list?.length) {
      this.selectedSensorControl.setValue(list[0]);
    }
  }

  public onAddSensorToGroup() {
    const sensorsGroup =  {
      id: uuidv4(),
      name: this.selectedSensorControl.value,
      source: new ChartsDataService()
    }

    const control = this.fb.control<ISensor>(sensorsGroup);
    this.sensorsGroupControl.push(control);
  }

  public onRemoveSensorFromGroup(index: number) {
    this.sensorsGroupControl.removeAt(index)
  }

  public onCreate() {
    this.created.emit({
      id: uuidv4(),
      group: [...this.sensorsGroupControl.value]
    });

    this.selectedSensorControl.setValue(this.list[0]);
    this.sensorsGroupControl.clear();
  }
}
