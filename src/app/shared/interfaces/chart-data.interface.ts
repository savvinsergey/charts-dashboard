import {Observable} from "rxjs";

export interface IChartData<T> {
  data$: Observable<T>;
}
