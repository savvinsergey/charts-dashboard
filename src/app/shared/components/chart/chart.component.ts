import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, DestroyRef, EventEmitter, inject,
  Input,
  OnChanges, Output,
  SimpleChanges
} from '@angular/core';
import {HighchartsChartModule} from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import {EChartType} from "../../enums/chart-type.enum";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ISensor} from "../../interfaces/sensor.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IChartData} from "../../interfaces/chart-data.interface";
import {ISeriesSetting} from "../../interfaces/series-setting.interface";
import {FiltersService} from "../../services/filters.service";
import {combineLatest, map} from "rxjs";

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    HighchartsChartModule
  ]
})
export class ChartComponent implements OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef)
  private readonly filtersService = inject(FiltersService);

  //-------------------------//

  @Input() sensors: ISensor[] = [];
  @Input() colors!: string[];
  @Input() types!: typeof EChartType;

  @Output() removed = new EventEmitter<void>();

  public updateFlag = false;
  public currentChart!: ISeriesSetting;

  public readonly Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {
    series: [],
    title: {
      text: 'Sensors data chart'
    },
    xAxis:{
      type: 'datetime',
    },
  };

  get series () {
    return this.chartOptions.series;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const sensors: ISensor[] = changes['sensors']?.currentValue;
    if (sensors?.length) {
      sensors.forEach((sensor, index) => {
        this.initChartSeries(sensor, index)
        this.subscribeToSource(sensor.source, index);
      });
    }
  }

  public onChangeType(type: EChartType) {
    const index = this.findIndexById() || 0;

    // @ts-ignore
    this.chartOptions.series[index].type = type;
    this.currentChart.type = type;
    this.updateFlag = true;
  }

  public onChangeColor(color: string) {
    const index = this.findIndexById() || 0;

    // @ts-ignore
    this.chartOptions.series[index].color = color;
    this.currentChart.color = color;
    this.updateFlag = true;
  }

  private initChartSeries(sensor: ISensor, index: number): void {
    const chartSettings = {
      id: sensor.id,
      name: sensor.name as string,
      type: this.types.LINE,
      color: this.colors?.[0] || 'grey',
    }

    // @ts-ignore
    this.chartOptions.series[index] = chartSettings;
    this.currentChart = chartSettings;
  }

  private subscribeToSource(source: IChartData<{x: number, y: number}[]>, index: number): void {
    combineLatest([
      source.data$,
      this.filtersService.filters$
    ])
      .pipe(
        map(([data, { toDate, fromDate }]) => {
          if (fromDate || toDate) {
            const defaultDateFrom = data[0].x;
            const defaultDateTo = data[data.length - 1].x;
            return data.filter(item =>
              item.x >= (fromDate || defaultDateFrom) && item.x <= (toDate || defaultDateTo)
            )
          }

          return data;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => {
        console.log(data)
        // @ts-ignore
        this.chartOptions.series[index].data = data;
        this.updateFlag = true;

        this.cdr.markForCheck();
      });
  }

  private findIndexById() {
    const index = this.chartOptions.series?.
      findIndex((chart) => chart.id === this.currentChart.id) || -1

    if (index === -1) {
      return;
    }

    return index;
  }
}
