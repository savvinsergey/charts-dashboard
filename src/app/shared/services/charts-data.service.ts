import {delay, interval, map, tap} from "rxjs";
import {IChartData} from "../interfaces/chart-data.interface";

export class ChartsDataService implements IChartData<{x: number, y: number}[]> {
  private timestamp = new Date().getTime();
  private dataArr: {x: number, y: number}[] = [];

  public readonly data$ = interval(1000)
    .pipe(
      tap(() => {
        this.dataArr = [...this.dataArr, {
          x: this.timestamp,
          y: this.number
        }];
        this.timestamp += 86_400_000;
      }),
      map(() => this.dataArr)
    );

  private get number(): number {
    return Math.floor(Math.random() * Math.floor(100));
  }
}
