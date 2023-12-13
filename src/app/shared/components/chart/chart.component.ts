import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, DestroyRef, inject,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {HighchartsChartModule} from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import {EChartType} from "../../enums/chart-type.enum";
import {CommonModule} from "@angular/common";
import {CChartColor} from "../../constants/chart-color.const";
import {FormsModule} from "@angular/forms";
import {ChartsDataService} from "../../services/charts-data.service";
import {ISensor} from "../../interfaces/chart-data.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Observable} from "rxjs";

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
  private readonly cdr = inject(ChangeDetectorRef);

  //-------------------------//

  @Input() sensors: ISensor[] = [];

  public updateFlag = false;
  public currentType = EChartType.LINE;

  public readonly chartTypes = EChartType;
  public readonly chartColors = CChartColor;

  public readonly Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {
    series: [],
    title: {
      text: 'Sensors data chart'
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    const sensors = changes['sensors']?.currentValue
    if (sensors?.length) {
      this.sensors.forEach((sensor, index) => {
        // @ts-ignore
        this.chartOptions.series[index] = {
          name: sensor.name as string,
          type: this.currentType,
          color: this.chartColors[0],
        }

        this.subscribeToSource(sensor.source, index);
      });
    }
  }

  public onChangeType(type: EChartType) {
    // @ts-ignore
    this.chartOptions.series.forEach(chart => chart.type = type)
    this.updateFlag = true;

    this.currentType = type;
  }

  public onChangeColor(color: string) {
    // @ts-ignore
    this.chartOptions.series.forEach(chart => chart.color = color);
    this.updateFlag = true;
  }

  private subscribeToSource(source: { data$: Observable<number[]>}, index: number) {
    source.data$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        // @ts-ignore
        this.chartOptions.series[index].data = data;
        this.updateFlag = true;

        this.cdr.detectChanges();
      });
  }
}
