import { Chart } from "./chart";
import { numericExtent } from "../util/array";
import { Padding } from "../util/padding";
import { Group } from "../scene/group";
import { CategoryAxis } from "./axis/categoryAxis";
import { GroupedCategoryAxis } from "./axis/groupedCategoryAxis";
import { reactive } from "../util/observable";
import { ChartAxisPosition } from "./chartAxis";

/** Defines the orientation used when rendering data series */
export enum CartesianChartLayout {
    Vertical,
    Horizontal
}

export class CartesianChart extends Chart {
    protected axisAutoPadding = new Padding();

    @reactive(['layoutChange']) flipXY = false;

    constructor() {
        super();

        const root = this.scene.root!;
        root.append(this._seriesRoot);
        root.append(this.legend.group);
    }

    private _seriesRoot = new Group();
    get seriesRoot(): Group {
        return this._seriesRoot;
    }

    performLayout(): void {
        if (this.dataPending) {
            return;
        }

        const { width, height, axes, legend } = this;

        const shrinkRect = {
            x: 0,
            y: 0,
            width,
            height
        };

        if (legend.enabled && legend.data.length) {
            const { legendAutoPadding } = this;
            const legendPadding = this.legend.padding;

            shrinkRect.x += legendAutoPadding.left;
            shrinkRect.y += legendAutoPadding.top;
            shrinkRect.width -= legendAutoPadding.left + legendAutoPadding.right;
            shrinkRect.height -= legendAutoPadding.top + legendAutoPadding.bottom;

            switch (this.legend.position) {
                case 'right':
                    shrinkRect.width -= legendPadding;
                    break;
                case 'bottom':
                    shrinkRect.height -= legendPadding;
                    break;
                case 'left':
                    shrinkRect.x += legendPadding;
                    shrinkRect.width -= legendPadding;
                    break;
                case 'top':
                    shrinkRect.y += legendPadding;
                    shrinkRect.height -= legendPadding;
                    break;
            }
        }

        const { captionAutoPadding, padding, axisAutoPadding } = this;

        shrinkRect.x += padding.left + axisAutoPadding.left;
        shrinkRect.y += padding.top + axisAutoPadding.top + captionAutoPadding;
        shrinkRect.width -= padding.left + padding.right + axisAutoPadding.left + axisAutoPadding.right;
        shrinkRect.height -= padding.top + padding.bottom + axisAutoPadding.top + axisAutoPadding.bottom + captionAutoPadding;

        axes.forEach(axis => {
            const { position } = axis;

            switch (position) {
                case ChartAxisPosition.Top:
                    break;
                case ChartAxisPosition.Right:
                    break;
                case ChartAxisPosition.Bottom:
                    axis.scale.range = [0, shrinkRect.width];
                    axis.translation.x = Math.floor(shrinkRect.x);
                    axis.translation.y = Math.floor(shrinkRect.y + shrinkRect.height + 1);
                    axis.gridLength = shrinkRect.height;
                    break;
                case ChartAxisPosition.Left:
                    if (axis instanceof CategoryAxis || axis instanceof GroupedCategoryAxis) {
                        axis.scale.range = [0, shrinkRect.height];
                    } else {
                        axis.scale.range = [shrinkRect.height, 0];
                    }
                    axis.translation.x = Math.floor(shrinkRect.x);
                    axis.translation.y = Math.floor(shrinkRect.y);
                    axis.gridLength = shrinkRect.width;
                    break;
            }
        });

        this.updateAxes();

        this.series.forEach(series => {
            series.group.translationX = Math.floor(shrinkRect.x);
            series.group.translationY = Math.floor(shrinkRect.y);
            series.update(); // this has to happen after the `updateAxes` call
        });

        this.positionCaptions();
        this.positionLegend();
    }

    private _layout: CartesianChartLayout = CartesianChartLayout.Vertical;
    set layout(value: CartesianChartLayout) {
        if (this._layout !== value) {
            this._layout = value;
            this.layoutPending = true;
        }
    }
    get layout(): CartesianChartLayout {
        return this._layout;
    }

    updateAxes() {
        const { axes } = this;
        // const isHorizontal = this.layout === CartesianChartLayout.Horizontal;
        // const xAxis = isHorizontal ? this.yAxis : this.xAxis;
        // const yAxis = isHorizontal ? this.xAxis : this.yAxis;

        // const xDomains: any[][] = [];
        // const yDomains: any[][] = [];

        // this.series.filter(s => s.visible).forEach(series => {
        //     xDomains.push(series.xDomain);
        //     yDomains.push(series.yDomain);
        // });

        // const xDomain = new Array<any>().concat(...xDomains);
        // const yDomain = new Array<any>().concat(...yDomains);

        // xAxis.domain = numericExtent(xDomain) || xDomain;
        // yAxis.domain = numericExtent(yDomain) || yDomain;

        axes.forEach(axis => {
            const { direction, position, boundSeries } = axis;
            const domains: any[][] = [];
            boundSeries.filter(s => s.visible).forEach(series => {
                domains.push(series.getDomain(direction));
            });
            const domain = new Array<any>().concat(...domains);
            axis.domain = numericExtent(domain) || domain;

            switch (position) {
                case ChartAxisPosition.Left:
                    {
                        const axisThickness = Math.floor(axis.getBBox().width);
                        if (this.axisAutoPadding.left !== axisThickness) {
                            this.axisAutoPadding.left = axisThickness;
                            this.layoutPending = true;
                        }
                    }
                    break;
                case ChartAxisPosition.Bottom:
                    {
                        const axisThickness = Math.floor(axis.getBBox().width);
                        if (this.axisAutoPadding.bottom !== axisThickness) {
                            this.axisAutoPadding.bottom = axisThickness;
                            this.layoutPending = true;
                        }
                    }
                    break;
            }

            axis.update();
        });

        // The `xAxis` and `yAxis` have `.this` prefix on purpose here,
        // because the local `xAxis` and `yAxis` variables may be swapped.
        // const xAxisBBox = this.xAxis.getBBox();
        // const yAxisBBox = this.yAxis.getBBox();

        // {
        //     const axisThickness = Math.floor(xAxisBBox.width);
        //     if (this.axisAutoPadding.bottom !== axisThickness) {
        //         this.axisAutoPadding.bottom = axisThickness;
        //         this.layoutPending = true;
        //     }
        // }
        // {
        //     const axisThickness = Math.floor(yAxisBBox.width);

        //     if (this.axisAutoPadding.left !== axisThickness) {
        //         this.axisAutoPadding.left = axisThickness;
        //         this.layoutPending = true;
        //     }
        // }
    }
}
