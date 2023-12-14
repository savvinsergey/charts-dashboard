import {EChartType} from "../enums/chart-type.enum";

export interface ISeriesSetting {
  id: string;
  name: string;
  type: EChartType;
  color: string;
}
