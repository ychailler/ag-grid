import { Series } from "../series";
import { ChartAxis, ChartAxisDirection } from "../../chartAxis";

export abstract class CartesianSeries extends Series {
    xAxis: ChartAxis;
    yAxis: ChartAxis;

    directions: ChartAxisDirection[] = [ChartAxisDirection.X, ChartAxisDirection.Y];

    directionKeys: { [key in ChartAxisDirection]?: string[] } = {
        [ChartAxisDirection.X]: ['xKey'],
        [ChartAxisDirection.Y]: ['yKey']
    };
}
