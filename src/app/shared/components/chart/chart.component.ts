import {
  Attribute,
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
import {Observable} from "rxjs";
import {IChartData} from "../../interfaces/chart-data.interface";

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
  @Input() colors!: string[];
  @Input() types!: typeof EChartType;

  @Output() removed = new EventEmitter<void>();

  public updateFlag = false;
  public currentType!: EChartType;

  public readonly Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {
    series: [],
    title: {
      text: 'Sensors data chart'
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    const sensors: ISensor[] = changes['sensors']?.currentValue;
    if (sensors?.length) {
      sensors.forEach((sensor, index) => {
        this.initChartSeries(sensor, index)
        this.subscribeToSource(sensor.source, index);
      });
    }

    const types: typeof EChartType = changes['types']?.currentValue;
    if (types) {
      this.currentType = EChartType.LINE;
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

  private initChartSeries(sensor: ISensor, index: number): void {
    // @ts-ignore
    this.chartOptions.series[index] = {
      name: sensor.name as string,
      type: this.currentType,
      color: this.colors?.[0] || 'grey',
    }
  }

  private subscribeToSource(source: IChartData<number[]>, index: number): void {
    source.data$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        // @ts-ignore
        this.chartOptions.series[index].data = data;
        this.updateFlag = true;

        this.cdr.markForCheck();
      });
  }
}
