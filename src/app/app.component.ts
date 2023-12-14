import {Component, inject, ViewChild} from '@angular/core';
import {CSensorsList} from "./shared/constants/sensors-list.const";
import {DrawerComponent} from "./shared/components/drawer/drawer.component";
import {ISensorsGroup} from "./shared/interfaces/sensors-group.interface";
import {CChartColor} from "./shared/constants/chart-color.const";
import {EChartType} from "./shared/enums/chart-type.enum";
import {FiltersService} from "./shared/services/filters.service";
import {IFilters} from "./shared/interfaces/filters.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly filtersService = inject(FiltersService);

  // ----------------------- //

  @ViewChild('addChartDrawer', { read: DrawerComponent })
  addChartDrawer!: DrawerComponent;

  public readonly maxAmountCharts = 2;
  public readonly chartTypes = EChartType;
  public readonly chartColors = CChartColor;
  public readonly sensorsList = CSensorsList;

  public sensorGroups: ISensorsGroup[] = [];

  public get maxWarningTooltip() {
    return `Maximum ${this.maxAmountCharts} charts can be located on the dashboard`;
  }

  public trackBy(index: number, sensorsGroup: ISensorsGroup): string {
    return sensorsGroup.id;
  }

  public onAddChart(sensorsGroup: ISensorsGroup) {
    this.sensorGroups = [...this.sensorGroups, sensorsGroup];
    this.addChartDrawer.close();
  }

  public onRemoveChart(id: string) {
    const index = this.sensorGroups
      .findIndex(sensorGroup => sensorGroup.id === id);
    if (index !== -1) {
      this.sensorGroups.splice(index, 1);
    }
  }

  public onDatesChanged(dates: [number | null, number | null]) {
    this.filtersService.filters = {
      fromDate: dates[0],
      toDate: dates[1]
    }
  }
}
