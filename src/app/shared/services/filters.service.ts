import {BehaviorSubject, interval, map, tap} from "rxjs";
import {IChartData} from "../interfaces/chart-data.interface";
import {Injectable} from "@angular/core";
import {IFilters} from "../interfaces/filters.interface";

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private readonly filtersSource = new BehaviorSubject<IFilters>({
    fromDate: null,
    toDate: null
  })

  public readonly filters$ = this.filtersSource.asObservable();

  set filters(value: IFilters ) {
    this.filtersSource.next(value);
  }
}
