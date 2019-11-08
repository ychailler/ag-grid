import { Series } from "../series";
import { ChartAxis } from "../../chartAxis";

export abstract class CartesianSeries extends Series {
    xAxis: ChartAxis;
    yAxis: ChartAxis;

    directions: string[] = ['x', 'y'];

    directionKeys = {
        x: ['xKey'],
        y: ['yKey']
    };
}
