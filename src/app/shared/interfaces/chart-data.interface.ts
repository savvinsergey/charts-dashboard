import {ChartsDataService} from "../services/charts-data.service";

export interface ISensor {
  name: string | null;
  source: ChartsDataService
}
