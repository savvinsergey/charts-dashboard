import { ChartsDataService } from "../services/charts-data.service";

export interface ISensor {
  id: string;
  name: string | null;
  source: ChartsDataService
}
