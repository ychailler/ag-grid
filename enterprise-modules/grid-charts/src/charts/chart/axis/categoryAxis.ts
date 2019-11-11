import { BandScale } from "../../scale/bandScale";
import { Axis } from "../../axis";
import { ChartAxis } from "../chartAxis";

export class CategoryAxis extends ChartAxis { // Axis<BandScale<string>> {
    constructor() {
        const scale = new BandScale<string>();
        scale.paddingInner = 0.2;
        scale.paddingOuter = 0.3;

        super(scale);
    }
}
