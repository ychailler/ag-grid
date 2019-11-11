import Scale from "../scale/scale";
import { Axis } from "../axis";
import { Series } from "./series/series";
import { tsThisType } from "@babel/types";

export enum ChartAxisDirection {
    X,
    Y,
    Angle,
    Radius
}

export enum ChartAxisPosition {
    Top,
    Right,
    Bottom,
    Left,
    Angle,
    Radius
}

export class ChartAxis extends Axis<Scale<any, number>> {
    keys: string[] = [];
    direction: ChartAxisDirection;
    boundSeries: Series[] = [];

    protected _position: ChartAxisPosition;
    set position(value: ChartAxisPosition) {
        if (this._position !== value) {
            this._position = value;
            switch (value) {
                case ChartAxisPosition.Top:
                    this.rotation = -90;
                    this.label.mirrored = true;
                    this.label.parallel = true;
                    break;
                case ChartAxisPosition.Right:
                    this.rotation = 0;
                    this.label.mirrored = true;
                    this.label.parallel = false;
                    break;
                case ChartAxisPosition.Bottom:
                    this.rotation = -90;
                    this.label.mirrored = false;
                    this.label.parallel = true;
                    break;
                case ChartAxisPosition.Left:
                    this.rotation = 0;
                    this.label.mirrored = false;
                    this.label.parallel = false;
                    break;
            }
        }
    }
    get position(): ChartAxisPosition {
        return this._position;
    }
}