declare var google: any;
declare var $:any;

export interface IGoogleChartWrapperOptions {
    chartType?: string
    options?: any
    containerId?: string
    query?: string
    dataSourceUrl?: string
    dataTable?: any
}

export class GoogleChartWrapperOptions implements IGoogleChartWrapperOptions {

    private _listeners: Array<Function> = [];

    constructor()
    constructor(chartType?: string, containerId?: string, dataTable?: any, options?: any)
    constructor(public chartType?: string, public containerId?: string, public dataTable?: any, public options?: any) {
        this.chartType = chartType || null;
        this.containerId = containerId || null;
        this.dataTable = dataTable || [];
        this.options = options || null;
    }

    public addListener(handler: Function) {
        this._listeners.push(handler)
    }

    public getListeners() {
        return this._listeners;
    }
}

export class GoogleChartsBaseService {
  constructor() {
    google.charts.load('current'); 
    // google.charts.load('current', {'packages':['corechart']});
  }

  protected buildChart(data: any[], chartFunc: any, options: any) : void {

    var func = (chartFunc, options) => {
      var datatable = google.visualization.arrayToDataTable(data);
      
      chartFunc().draw(datatable, options);
    };   

    var callback = () => func(chartFunc, options);

    google.charts.setOnLoadCallback(callback);
  }

  protected buildFromWrapper(options: GoogleChartWrapperOptions) {

    function drawChart() { 
        let wrapper = new google.visualization.ChartWrapper(options); 

        let eventListeners = options.getListeners();

        if(eventListeners.length > 0) {
            eventListeners.forEach(listener => {
                google.visualization.events.addListener(wrapper, 'ready', listener);
            });
        }

        wrapper.draw();
    }

    google.charts.setOnLoadCallback(drawChart);

  }
  
}
