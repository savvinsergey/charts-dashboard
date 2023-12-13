import {interval, map, tap} from "rxjs";
import {IChartData} from "../interfaces/chart-data.interface";

export class ChartsDataService implements IChartData<number[]> {
  private dataArr: number[] = [];

  public readonly data$ = interval(1000)
    .pipe(
      tap(() => this.dataArr = [...this.dataArr, this.number]),
      map(() => this.dataArr)
    );

  private get number(): number {
    return Math.floor(Math.random() * Math.floor(100));
  }
}
