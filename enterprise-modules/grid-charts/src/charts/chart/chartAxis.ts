import Scale from "../scale/scale";
import { Axis } from "../axis";
import { Series } from "./series/series";

export class ChartAxis extends Axis<Scale<any, number>> {
    keys: string[] = [];
    direction: string;
    boundSeries: Series[] = [];
}

export class CartesianAxis extends ChartAxis  {
    direction: string; // 'x' | 'y'
}

export class PolarAxis extends ChartAxis {
    direction: string; // 'angle' | 'radius'
}

// axis.direction = 'x' | 'y'
// series[axis.direction + 'Axis'];
// series[axis.direction + 'Axis'];

// series.angleAxis();
// series.radiusAxis();
