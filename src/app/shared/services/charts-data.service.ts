import {interval, map, tap} from "rxjs";

export class ChartsDataService {
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
