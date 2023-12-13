import {ISensor} from "./sensor.interface";

export interface ISensorsGroup {
  id: string;
  group: ISensor[];
}
