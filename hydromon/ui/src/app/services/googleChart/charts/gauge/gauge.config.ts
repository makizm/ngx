export class GaugeChartConfig {

    constructor()
    constructor(
        style?: string,
        width?: number,
        height?: number,
        redFrom?: number,
        redTo?: number,
        yellowColor?: string,
        yellowFrom?: number,
        yellowTo?: number,
        greenColor?: string,
        greenFrom?: number,
        greenTo?: number,
        minorTicks?: number
    )
    constructor(
        public style?: string,
        public width?: number,
        public height?: number,
        public redFrom?: number,
        public redTo?: number,
        public yellowColor?: string,
        public yellowFrom?: number,
        public yellowTo?: number,
        public greenColor?: string,
        public greenFrom?: number,
        public greenTo?: number,
        public minorTicks?: number
    ) {
        this.style = style || "light";  // light/dark
        this.width = width || null;
        this.height = height || null;
        this.redFrom = redFrom || null;
        this.redTo = redTo || null;
        this.yellowColor = yellowColor || null;
        this.yellowFrom = yellowFrom || null;
        this.yellowTo = yellowTo || null;
        this.greenColor = greenColor || null;
        this.greenFrom = greenFrom || null;
        this.greenTo = greenTo || null;
        this.minorTicks = minorTicks || null;
    }
}
