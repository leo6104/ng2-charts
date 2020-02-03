/**
 * @fileoverview added by tsickle
 * Generated from: lib/base-chart.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, ElementRef, } from '@angular/core';
import * as chartJs from 'chart.js';
import { getColors } from './get-colors';
import { ThemeService } from './theme.service';
import { cloneDeep } from 'lodash-es';
/**
 * @record
 */
function OldState() { }
if (false) {
    /** @type {?} */
    OldState.prototype.dataExists;
    /** @type {?} */
    OldState.prototype.dataLength;
    /** @type {?} */
    OldState.prototype.datasetsExists;
    /** @type {?} */
    OldState.prototype.datasetsLength;
    /** @type {?} */
    OldState.prototype.datasetsDataObjects;
    /** @type {?} */
    OldState.prototype.datasetsDataLengths;
    /** @type {?} */
    OldState.prototype.colorsExists;
    /** @type {?} */
    OldState.prototype.colors;
    /** @type {?} */
    OldState.prototype.labelsExist;
    /** @type {?} */
    OldState.prototype.labels;
    /** @type {?} */
    OldState.prototype.legendExists;
    /** @type {?} */
    OldState.prototype.legend;
}
/** @enum {number} */
const UpdateType = {
    Default: 0,
    Update: 1,
    Refresh: 2,
};
UpdateType[UpdateType.Default] = 'Default';
UpdateType[UpdateType.Update] = 'Update';
UpdateType[UpdateType.Refresh] = 'Refresh';
export class BaseChartDirective {
    /**
     * @param {?} element
     * @param {?} themeService
     */
    constructor(element, themeService) {
        this.element = element;
        this.themeService = themeService;
        this.options = {};
        this.chartClick = new EventEmitter();
        this.chartHover = new EventEmitter();
        this.old = {
            dataExists: false,
            dataLength: 0,
            datasetsExists: false,
            datasetsLength: 0,
            datasetsDataObjects: [],
            datasetsDataLengths: [],
            colorsExists: false,
            colors: [],
            labelsExist: false,
            labels: [],
            legendExists: false,
            legend: {},
        };
        this.subs = [];
    }
    /**
     * Register a plugin.
     * @param {?} plugin
     * @return {?}
     */
    static registerPlugin(plugin) {
        chartJs.Chart.plugins.register(plugin);
    }
    /**
     * @param {?} plugin
     * @return {?}
     */
    static unregisterPlugin(plugin) {
        chartJs.Chart.plugins.unregister(plugin);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ctx = this.element.nativeElement.getContext('2d');
        this.refresh();
        this.subs.push(this.themeService.colorschemesOptions.subscribe((/**
         * @param {?} r
         * @return {?}
         */
        r => this.themeChanged(r))));
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    themeChanged(options) {
        this.refresh();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (!this.chart) {
            return;
        }
        /** @type {?} */
        let updateRequired = UpdateType.Default;
        /** @type {?} */
        const wantUpdate = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            updateRequired = x > updateRequired ? x : updateRequired;
        });
        if (!!this.data !== this.old.dataExists) {
            this.propagateDataToDatasets(this.data);
            this.old.dataExists = !!this.data;
            wantUpdate(UpdateType.Update);
        }
        if (this.data && this.data.length !== this.old.dataLength) {
            this.old.dataLength = this.data && this.data.length || 0;
            wantUpdate(UpdateType.Update);
        }
        if (!!this.datasets !== this.old.datasetsExists) {
            this.old.datasetsExists = !!this.datasets;
            wantUpdate(UpdateType.Update);
        }
        if (this.datasets && this.datasets.length !== this.old.datasetsLength) {
            this.old.datasetsLength = this.datasets && this.datasets.length || 0;
            wantUpdate(UpdateType.Update);
        }
        if (this.datasets && this.datasets.filter((/**
         * @param {?} x
         * @param {?} i
         * @return {?}
         */
        (x, i) => x.data !== this.old.datasetsDataObjects[i])).length) {
            this.old.datasetsDataObjects = this.datasets.map((/**
             * @param {?} x
             * @return {?}
             */
            x => x.data));
            wantUpdate(UpdateType.Update);
        }
        if (this.datasets && this.datasets.filter((/**
         * @param {?} x
         * @param {?} i
         * @return {?}
         */
        (x, i) => x.data.length !== this.old.datasetsDataLengths[i])).length) {
            this.old.datasetsDataLengths = this.datasets.map((/**
             * @param {?} x
             * @return {?}
             */
            x => x.data.length));
            wantUpdate(UpdateType.Update);
        }
        if (!!this.colors !== this.old.colorsExists) {
            this.old.colorsExists = !!this.colors;
            this.updateColors();
            wantUpdate(UpdateType.Update);
        }
        // This smells of inefficiency, might need to revisit this
        if (this.colors && this.colors.filter((/**
         * @param {?} x
         * @param {?} i
         * @return {?}
         */
        (x, i) => !this.colorsEqual(x, this.old.colors[i]))).length) {
            this.old.colors = this.colors.map((/**
             * @param {?} x
             * @return {?}
             */
            x => this.copyColor(x)));
            this.updateColors();
            wantUpdate(UpdateType.Update);
        }
        if (!!this.labels !== this.old.labelsExist) {
            this.old.labelsExist = !!this.labels;
            wantUpdate(UpdateType.Update);
        }
        if (this.labels && this.labels.filter((/**
         * @param {?} x
         * @param {?} i
         * @return {?}
         */
        (x, i) => !this.labelsEqual(x, this.old.labels[i]))).length) {
            this.old.labels = this.labels.map((/**
             * @param {?} x
             * @return {?}
             */
            x => this.copyLabel(x)));
            wantUpdate(UpdateType.Update);
        }
        if (!!this.options.legend !== this.old.legendExists) {
            this.old.legendExists = !!this.options.legend;
            wantUpdate(UpdateType.Refresh);
        }
        if (this.options.legend && this.options.legend.position !== this.old.legend.position) {
            this.old.legend.position = this.options.legend.position;
            wantUpdate(UpdateType.Refresh);
        }
        switch ((/** @type {?} */ (updateRequired))) {
            case UpdateType.Default:
                break;
            case UpdateType.Update:
                this.update();
                break;
            case UpdateType.Refresh:
                this.refresh();
                break;
        }
    }
    /**
     * @param {?} a
     * @return {?}
     */
    copyLabel(a) {
        if (Array.isArray(a)) {
            return [...a];
        }
        return a;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    labelsEqual(a, b) {
        return true
            && Array.isArray(a) === Array.isArray(b)
            && (Array.isArray(a) || a === b)
            && (!Array.isArray(a) || a.length === b.length)
            && (!Array.isArray(a) || a.filter((/**
             * @param {?} x
             * @param {?} i
             * @return {?}
             */
            (x, i) => x !== b[i])).length === 0);
    }
    /**
     * @param {?} a
     * @return {?}
     */
    copyColor(a) {
        /** @type {?} */
        const rc = {
            backgroundColor: a.backgroundColor,
            borderWidth: a.borderWidth,
            borderColor: a.borderColor,
            borderCapStyle: a.borderCapStyle,
            borderDash: a.borderDash,
            borderDashOffset: a.borderDashOffset,
            borderJoinStyle: a.borderJoinStyle,
            pointBorderColor: a.pointBorderColor,
            pointBackgroundColor: a.pointBackgroundColor,
            pointBorderWidth: a.pointBorderWidth,
            pointRadius: a.pointRadius,
            pointHoverRadius: a.pointHoverRadius,
            pointHitRadius: a.pointHitRadius,
            pointHoverBackgroundColor: a.pointHoverBackgroundColor,
            pointHoverBorderColor: a.pointHoverBorderColor,
            pointHoverBorderWidth: a.pointHoverBorderWidth,
            pointStyle: a.pointStyle,
            hoverBackgroundColor: a.hoverBackgroundColor,
            hoverBorderColor: a.hoverBorderColor,
            hoverBorderWidth: a.hoverBorderWidth,
        };
        return rc;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    colorsEqual(a, b) {
        if (!a !== !b) {
            return false;
        }
        return !a || true
            && (a.backgroundColor === b.backgroundColor)
            && (a.borderWidth === b.borderWidth)
            && (a.borderColor === b.borderColor)
            && (a.borderCapStyle === b.borderCapStyle)
            && (a.borderDash === b.borderDash)
            && (a.borderDashOffset === b.borderDashOffset)
            && (a.borderJoinStyle === b.borderJoinStyle)
            && (a.pointBorderColor === b.pointBorderColor)
            && (a.pointBackgroundColor === b.pointBackgroundColor)
            && (a.pointBorderWidth === b.pointBorderWidth)
            && (a.pointRadius === b.pointRadius)
            && (a.pointHoverRadius === b.pointHoverRadius)
            && (a.pointHitRadius === b.pointHitRadius)
            && (a.pointHoverBackgroundColor === b.pointHoverBackgroundColor)
            && (a.pointHoverBorderColor === b.pointHoverBorderColor)
            && (a.pointHoverBorderWidth === b.pointHoverBorderWidth)
            && (a.pointStyle === b.pointStyle)
            && (a.hoverBackgroundColor === b.hoverBackgroundColor)
            && (a.hoverBorderColor === b.hoverBorderColor)
            && (a.hoverBorderWidth === b.hoverBorderWidth);
    }
    /**
     * @return {?}
     */
    updateColors() {
        this.datasets.forEach((/**
         * @param {?} elm
         * @param {?} index
         * @return {?}
         */
        (elm, index) => {
            if (this.colors && this.colors[index]) {
                Object.assign(elm, this.colors[index]);
            }
            else {
                Object.assign(elm, getColors(this.chartType, index, elm.data.length), Object.assign({}, elm));
            }
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        let updateRequired = UpdateType.Default;
        /** @type {?} */
        const wantUpdate = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            updateRequired = x > updateRequired ? x : updateRequired;
        });
        // Check if the changes are in the data or datasets or labels or legend
        if (changes.hasOwnProperty('data') && changes.data.currentValue) {
            this.propagateDataToDatasets(changes.data.currentValue);
            wantUpdate(UpdateType.Update);
        }
        if (changes.hasOwnProperty('datasets') && changes.datasets.currentValue) {
            this.propagateDatasetsToData(changes.datasets.currentValue);
            wantUpdate(UpdateType.Update);
        }
        if (changes.hasOwnProperty('labels')) {
            if (this.chart) {
                this.chart.data.labels = changes.labels.currentValue;
            }
            wantUpdate(UpdateType.Update);
        }
        if (changes.hasOwnProperty('legend')) {
            if (this.chart) {
                this.chart.config.options.legend.display = changes.legend.currentValue;
                this.chart.generateLegend();
            }
            wantUpdate(UpdateType.Update);
        }
        if (changes.hasOwnProperty('options')) {
            wantUpdate(UpdateType.Refresh);
        }
        switch ((/** @type {?} */ (updateRequired))) {
            case UpdateType.Update:
                this.update();
                break;
            case UpdateType.Refresh:
            case UpdateType.Default:
                this.refresh();
                break;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
        this.subs.forEach((/**
         * @param {?} x
         * @return {?}
         */
        x => x.unsubscribe()));
    }
    /**
     * @param {?=} duration
     * @param {?=} lazy
     * @return {?}
     */
    update(duration, lazy) {
        if (this.chart) {
            return this.chart.update(duration, lazy);
        }
    }
    /**
     * @param {?} index
     * @param {?} hidden
     * @return {?}
     */
    hideDataset(index, hidden) {
        this.chart.getDatasetMeta(index).hidden = hidden;
        this.chart.update();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    isDatasetHidden(index) {
        return this.chart.getDatasetMeta(index).hidden;
    }
    /**
     * @return {?}
     */
    toBase64Image() {
        return this.chart.toBase64Image();
    }
    /**
     * @return {?}
     */
    getChartConfiguration() {
        /** @type {?} */
        const datasets = this.getDatasets();
        /** @type {?} */
        const options = Object.assign({}, this.options);
        if (this.legend === false) {
            options.legend = { display: false };
        }
        // hook for onHover and onClick events
        options.hover = options.hover || {};
        if (!options.hover.onHover) {
            options.hover.onHover = (/**
             * @param {?} event
             * @param {?} active
             * @return {?}
             */
            (event, active) => {
                if (active && !active.length) {
                    return;
                }
                this.chartHover.emit({ event, active });
            });
        }
        if (!options.onClick) {
            options.onClick = (/**
             * @param {?=} event
             * @param {?=} active
             * @return {?}
             */
            (event, active) => {
                this.chartClick.emit({ event, active });
            });
        }
        /** @type {?} */
        const mergedOptions = this.smartMerge(options, this.themeService.getColorschemesOptions());
        /** @type {?} */
        const chartConfig = {
            type: this.chartType,
            data: {
                labels: this.labels || [],
                datasets
            },
            plugins: this.plugins,
            options: mergedOptions,
        };
        return chartConfig;
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getChartBuilder(ctx /*, data:any[], options:any*/) {
        /** @type {?} */
        const chartConfig = this.getChartConfiguration();
        return new chartJs.Chart(ctx, chartConfig);
    }
    /**
     * @param {?} options
     * @param {?} overrides
     * @param {?=} level
     * @return {?}
     */
    smartMerge(options, overrides, level = 0) {
        if (level === 0) {
            options = cloneDeep(options);
        }
        /** @type {?} */
        const keysToUpdate = Object.keys(overrides);
        keysToUpdate.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            if (Array.isArray(overrides[key])) {
                /** @type {?} */
                const arrayElements = options[key];
                if (arrayElements) {
                    arrayElements.forEach((/**
                     * @param {?} r
                     * @return {?}
                     */
                    r => {
                        this.smartMerge(r, overrides[key][0], level + 1);
                    }));
                }
            }
            else if (typeof (overrides[key]) === 'object') {
                if (!(key in options)) {
                    options[key] = {};
                }
                this.smartMerge(options[key], overrides[key], level + 1);
            }
            else {
                options[key] = overrides[key];
            }
        }));
        if (level === 0) {
            return options;
        }
    }
    /**
     * @private
     * @param {?} label
     * @return {?}
     */
    isMultiLineLabel(label) {
        return Array.isArray(label);
    }
    /**
     * @private
     * @param {?} label
     * @return {?}
     */
    joinLabel(label) {
        if (!label) {
            return null;
        }
        if (this.isMultiLineLabel(label)) {
            return label.join(' ');
        }
        else {
            return label;
        }
    }
    /**
     * @private
     * @param {?} datasets
     * @return {?}
     */
    propagateDatasetsToData(datasets) {
        this.data = this.datasets.map((/**
         * @param {?} r
         * @return {?}
         */
        r => r.data));
        if (this.chart) {
            this.chart.data.datasets = datasets;
        }
        this.updateColors();
    }
    /**
     * @private
     * @param {?} newDataValues
     * @return {?}
     */
    propagateDataToDatasets(newDataValues) {
        if (this.isMultiDataSet(newDataValues)) {
            if (this.datasets && newDataValues.length === this.datasets.length) {
                this.datasets.forEach((/**
                 * @param {?} dataset
                 * @param {?} i
                 * @return {?}
                 */
                (dataset, i) => {
                    dataset.data = newDataValues[i];
                }));
            }
            else {
                this.datasets = newDataValues.map((/**
                 * @param {?} data
                 * @param {?} index
                 * @return {?}
                 */
                (data, index) => {
                    return { data, label: this.joinLabel(this.labels[index]) || `Label ${index}` };
                }));
                if (this.chart) {
                    this.chart.data.datasets = this.datasets;
                }
            }
        }
        else {
            if (!this.datasets) {
                this.datasets = [{ data: newDataValues }];
                if (this.chart) {
                    this.chart.data.datasets = this.datasets;
                }
            }
            else {
                this.datasets[0].data = newDataValues;
                this.datasets.splice(1); // Remove all elements but the first
            }
        }
        this.updateColors();
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    isMultiDataSet(data) {
        return Array.isArray(data[0]);
    }
    /**
     * @private
     * @return {?}
     */
    getDatasets() {
        if (!this.datasets && !this.data) {
            throw new Error(`ng-charts configuration error, data or datasets field are required to render chart ${this.chartType}`);
        }
        // If `datasets` is defined, use it over the `data` property.
        if (this.datasets) {
            this.propagateDatasetsToData(this.datasets);
            return this.datasets;
        }
        if (this.data) {
            this.propagateDataToDatasets(this.data);
            return this.datasets;
        }
    }
    /**
     * @private
     * @return {?}
     */
    refresh() {
        // if (this.options && this.options.responsive) {
        //   setTimeout(() => this.refresh(), 50);
        // }
        // todo: remove this line, it is producing flickering
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
        if (this.ctx) {
            this.chart = this.getChartBuilder(this.ctx /*, data, this.options*/);
        }
    }
}
BaseChartDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'canvas[baseChart]',
                exportAs: 'base-chart'
            },] }
];
/** @nocollapse */
BaseChartDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ThemeService }
];
BaseChartDirective.propDecorators = {
    data: [{ type: Input }],
    datasets: [{ type: Input }],
    labels: [{ type: Input }],
    options: [{ type: Input }],
    chartType: [{ type: Input }],
    colors: [{ type: Input }],
    legend: [{ type: Input }],
    plugins: [{ type: Input }],
    chartClick: [{ type: Output }],
    chartHover: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    BaseChartDirective.prototype.data;
    /** @type {?} */
    BaseChartDirective.prototype.datasets;
    /** @type {?} */
    BaseChartDirective.prototype.labels;
    /** @type {?} */
    BaseChartDirective.prototype.options;
    /** @type {?} */
    BaseChartDirective.prototype.chartType;
    /** @type {?} */
    BaseChartDirective.prototype.colors;
    /** @type {?} */
    BaseChartDirective.prototype.legend;
    /** @type {?} */
    BaseChartDirective.prototype.plugins;
    /** @type {?} */
    BaseChartDirective.prototype.chartClick;
    /** @type {?} */
    BaseChartDirective.prototype.chartHover;
    /** @type {?} */
    BaseChartDirective.prototype.ctx;
    /** @type {?} */
    BaseChartDirective.prototype.chart;
    /**
     * @type {?}
     * @private
     */
    BaseChartDirective.prototype.old;
    /**
     * @type {?}
     * @private
     */
    BaseChartDirective.prototype.subs;
    /**
     * @type {?}
     * @private
     */
    BaseChartDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    BaseChartDirective.prototype.themeService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jaGFydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhc2UtY2hhcnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEdBR1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7OztBQVd0Qyx1QkFlQzs7O0lBZEMsOEJBQW9COztJQUNwQiw4QkFBbUI7O0lBQ25CLGtDQUF3Qjs7SUFDeEIsa0NBQXVCOztJQUN2Qix1Q0FBMkI7O0lBQzNCLHVDQUE4Qjs7SUFDOUIsZ0NBQXNCOztJQUN0QiwwQkFBZ0I7O0lBQ2hCLCtCQUFxQjs7SUFDckIsMEJBQWdCOztJQUNoQixnQ0FBc0I7O0lBQ3RCLDBCQUVFOzs7QUFHSixNQUFLLFVBQVU7SUFDYixPQUFPLEdBQUE7SUFDUCxNQUFNLEdBQUE7SUFDTixPQUFPLEdBQUE7RUFDUjs7OztBQU9ELE1BQU0sT0FBTyxrQkFBa0I7Ozs7O0lBNEM3QixZQUNVLE9BQW1CLEVBQ25CLFlBQTBCO1FBRDFCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUExQ3BCLFlBQU8sR0FBeUIsRUFBRSxDQUFDO1FBTWxDLGVBQVUsR0FBd0QsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRixlQUFVLEdBQXNELElBQUksWUFBWSxFQUFFLENBQUM7UUFLNUYsUUFBRyxHQUFhO1lBQ3RCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFVBQVUs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O1lBQ3JFLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBRXJFLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNOzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3RHLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUM7WUFFOUQsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07Ozs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsTUFBTSxFQUFFO1lBQzdHLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDO1lBRXJFLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUFFRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFO1lBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBRXRDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQixVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO1FBRUQsMERBQTBEO1FBQzFELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Ozs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDaEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFFMUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXBCLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUFFRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO1lBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBRXJDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNOzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFB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QUFnQzs7SUFDaEMscUNBQXFFOztJQUVyRSx3Q0FBc0c7O0lBQ3RHLHdDQUFvRzs7SUFFcEcsaUNBQW1COztJQUNuQixtQ0FBb0I7Ozs7O0lBRXBCLGlDQWFFOzs7OztJQUVGLGtDQUFrQzs7Ozs7SUFjaEMscUNBQTJCOzs7OztJQUMzQiwwQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgRG9DaGVjayxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBjaGFydEpzIGZyb20gJ2NoYXJ0LmpzJztcbmltcG9ydCB7IGdldENvbG9ycyB9IGZyb20gJy4vZ2V0LWNvbG9ycyc7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJy4vY29sb3InO1xuaW1wb3J0IHsgVGhlbWVTZXJ2aWNlIH0gZnJvbSAnLi90aGVtZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2xvbmVEZWVwIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuZXhwb3J0IHR5cGUgU2luZ2xlRGF0YVNldCA9IChudW1iZXJbXSB8IGNoYXJ0SnMuQ2hhcnRQb2ludFtdKTtcbmV4cG9ydCB0eXBlIE11bHRpRGF0YVNldCA9IChudW1iZXJbXSB8IGNoYXJ0SnMuQ2hhcnRQb2ludFtdKVtdO1xuZXhwb3J0IHR5cGUgU2luZ2xlT3JNdWx0aURhdGFTZXQgPSBTaW5nbGVEYXRhU2V0IHwgTXVsdGlEYXRhU2V0O1xuXG5leHBvcnQgdHlwZSBQbHVnaW5TZXJ2aWNlR2xvYmFsUmVnaXN0cmF0aW9uQW5kT3B0aW9ucyA9IGNoYXJ0SnMuUGx1Z2luU2VydmljZUdsb2JhbFJlZ2lzdHJhdGlvbiAmIGNoYXJ0SnMuUGx1Z2luU2VydmljZVJlZ2lzdHJhdGlvbk9wdGlvbnM7XG5leHBvcnQgdHlwZSBTaW5nbGVMaW5lTGFiZWwgPSBzdHJpbmc7XG5leHBvcnQgdHlwZSBNdWx0aUxpbmVMYWJlbCA9IHN0cmluZ1tdO1xuZXhwb3J0IHR5cGUgTGFiZWwgPSBTaW5nbGVMaW5lTGFiZWwgfCBNdWx0aUxpbmVMYWJlbDtcblxuaW50ZXJmYWNlIE9sZFN0YXRlIHtcbiAgZGF0YUV4aXN0czogYm9vbGVhbjtcbiAgZGF0YUxlbmd0aDogbnVtYmVyO1xuICBkYXRhc2V0c0V4aXN0czogYm9vbGVhbjtcbiAgZGF0YXNldHNMZW5ndGg6IG51bWJlcjtcbiAgZGF0YXNldHNEYXRhT2JqZWN0czogYW55W107XG4gIGRhdGFzZXRzRGF0YUxlbmd0aHM6IG51bWJlcltdO1xuICBjb2xvcnNFeGlzdHM6IGJvb2xlYW47XG4gIGNvbG9yczogQ29sb3JbXTtcbiAgbGFiZWxzRXhpc3Q6IGJvb2xlYW47XG4gIGxhYmVsczogTGFiZWxbXTtcbiAgbGVnZW5kRXhpc3RzOiBib29sZWFuO1xuICBsZWdlbmQ6IHtcbiAgICBwb3NpdGlvbj86IHN0cmluZztcbiAgfTtcbn1cblxuZW51bSBVcGRhdGVUeXBlIHtcbiAgRGVmYXVsdCxcbiAgVXBkYXRlLFxuICBSZWZyZXNoXG59XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnY2FudmFzW2Jhc2VDaGFydF0nLFxuICBleHBvcnRBczogJ2Jhc2UtY2hhcnQnXG59KVxuZXhwb3J0IGNsYXNzIEJhc2VDaGFydERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSwgRG9DaGVjayB7XG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhOiBTaW5nbGVPck11bHRpRGF0YVNldDtcbiAgQElucHV0KCkgcHVibGljIGRhdGFzZXRzOiBjaGFydEpzLkNoYXJ0RGF0YVNldHNbXTtcbiAgQElucHV0KCkgcHVibGljIGxhYmVsczogTGFiZWxbXTtcbiAgQElucHV0KCkgcHVibGljIG9wdGlvbnM6IGNoYXJ0SnMuQ2hhcnRPcHRpb25zID0ge307XG4gIEBJbnB1dCgpIHB1YmxpYyBjaGFydFR5cGU6IGNoYXJ0SnMuQ2hhcnRUeXBlO1xuICBASW5wdXQoKSBwdWJsaWMgY29sb3JzOiBDb2xvcltdO1xuICBASW5wdXQoKSBwdWJsaWMgbGVnZW5kOiBib29sZWFuO1xuICBASW5wdXQoKSBwdWJsaWMgcGx1Z2luczogUGx1Z2luU2VydmljZUdsb2JhbFJlZ2lzdHJhdGlvbkFuZE9wdGlvbnNbXTtcblxuICBAT3V0cHV0KCkgcHVibGljIGNoYXJ0Q2xpY2s6IEV2ZW50RW1pdHRlcjx7IGV2ZW50PzogTW91c2VFdmVudCwgYWN0aXZlPzoge31bXSB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBjaGFydEhvdmVyOiBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudCwgYWN0aXZlOiB7fVtdIH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBjdHg6IHN0cmluZztcbiAgcHVibGljIGNoYXJ0OiBDaGFydDtcblxuICBwcml2YXRlIG9sZDogT2xkU3RhdGUgPSB7XG4gICAgZGF0YUV4aXN0czogZmFsc2UsXG4gICAgZGF0YUxlbmd0aDogMCxcbiAgICBkYXRhc2V0c0V4aXN0czogZmFsc2UsXG4gICAgZGF0YXNldHNMZW5ndGg6IDAsXG4gICAgZGF0YXNldHNEYXRhT2JqZWN0czogW10sXG4gICAgZGF0YXNldHNEYXRhTGVuZ3RoczogW10sXG4gICAgY29sb3JzRXhpc3RzOiBmYWxzZSxcbiAgICBjb2xvcnM6IFtdLFxuICAgIGxhYmVsc0V4aXN0OiBmYWxzZSxcbiAgICBsYWJlbHM6IFtdLFxuICAgIGxlZ2VuZEV4aXN0czogZmFsc2UsXG4gICAgbGVnZW5kOiB7fSxcbiAgfTtcblxuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgcGx1Z2luLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWdpc3RlclBsdWdpbihwbHVnaW46IFBsdWdpblNlcnZpY2VHbG9iYWxSZWdpc3RyYXRpb25BbmRPcHRpb25zKSB7XG4gICAgY2hhcnRKcy5DaGFydC5wbHVnaW5zLnJlZ2lzdGVyKHBsdWdpbik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHVucmVnaXN0ZXJQbHVnaW4ocGx1Z2luOiBQbHVnaW5TZXJ2aWNlR2xvYmFsUmVnaXN0cmF0aW9uQW5kT3B0aW9ucykge1xuICAgIGNoYXJ0SnMuQ2hhcnQucGx1Z2lucy51bnJlZ2lzdGVyKHBsdWdpbik7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgdGhlbWVTZXJ2aWNlOiBUaGVtZVNlcnZpY2UsXG4gICkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3R4ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB0aGlzLnN1YnMucHVzaCh0aGlzLnRoZW1lU2VydmljZS5jb2xvcnNjaGVtZXNPcHRpb25zLnN1YnNjcmliZShyID0+IHRoaXMudGhlbWVDaGFuZ2VkKHIpKSk7XG4gIH1cblxuICBwcml2YXRlIHRoZW1lQ2hhbmdlZChvcHRpb25zOiB7fSkge1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jaGFydCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgdXBkYXRlUmVxdWlyZWQgPSBVcGRhdGVUeXBlLkRlZmF1bHQ7XG4gICAgY29uc3Qgd2FudFVwZGF0ZSA9ICh4OiBVcGRhdGVUeXBlKSA9PiB7XG4gICAgICB1cGRhdGVSZXF1aXJlZCA9IHggPiB1cGRhdGVSZXF1aXJlZCA/IHggOiB1cGRhdGVSZXF1aXJlZDtcbiAgICB9O1xuXG4gICAgaWYgKCEhdGhpcy5kYXRhICE9PSB0aGlzLm9sZC5kYXRhRXhpc3RzKSB7XG4gICAgICB0aGlzLnByb3BhZ2F0ZURhdGFUb0RhdGFzZXRzKHRoaXMuZGF0YSk7XG5cbiAgICAgIHRoaXMub2xkLmRhdGFFeGlzdHMgPSAhIXRoaXMuZGF0YTtcblxuICAgICAgd2FudFVwZGF0ZShVcGRhdGVUeXBlLlVwZGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubGVuZ3RoICE9PSB0aGlzLm9sZC5kYXRhTGVuZ3RoKSB7XG4gICAgICB0aGlzLm9sZC5kYXRhTGVuZ3RoID0gdGhpcy5kYXRhICYmIHRoaXMuZGF0YS5sZW5ndGggfHwgMDtcblxuICAgICAgd2FudFVwZGF0ZShVcGRhdGVUeXBlLlVwZGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKCEhdGhpcy5kYXRhc2V0cyAhPT0gdGhpcy5vbGQuZGF0YXNldHNFeGlzdHMpIHtcbiAgICAgIHRoaXMub2xkLmRhdGFzZXRzRXhpc3RzID0gISF0aGlzLmRhdGFzZXRzO1xuXG4gICAgICB3YW50VXBkYXRlKFVwZGF0ZVR5cGUuVXBkYXRlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRhc2V0cyAmJiB0aGlzLmRhdGFzZXRzLmxlbmd0aCAhPT0gdGhpcy5vbGQuZGF0YXNldHNMZW5ndGgpIHtcbiAgICAgIHRoaXMub2xkLmRhdGFzZXRzTGVuZ3RoID0gdGhpcy5kYXRhc2V0cyAmJiB0aGlzLmRhdGFzZXRzLmxlbmd0aCB8fCAwO1xuXG4gICAgICB3YW50VXBkYXRlKFVwZGF0ZVR5cGUuVXBkYXRlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRhc2V0cyAmJiB0aGlzLmRhdGFzZXRzLmZpbHRlcigoeCwgaSkgPT4geC5kYXRhICE9PSB0aGlzLm9sZC5kYXRhc2V0c0RhdGFPYmplY3RzW2ldKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMub2xkLmRhdGFzZXRzRGF0YU9iamVjdHMgPSB0aGlzLmRhdGFzZXRzLm1hcCh4ID0+IHguZGF0YSk7XG5cbiAgICAgIHdhbnRVcGRhdGUoVXBkYXRlVHlwZS5VcGRhdGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGFzZXRzICYmIHRoaXMuZGF0YXNldHMuZmlsdGVyKCh4LCBpKSA9PiB4LmRhdGEubGVuZ3RoICE9PSB0aGlzLm9sZC5kYXRhc2V0c0RhdGFMZW5ndGhzW2ldKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMub2xkLmRhdGFzZXRzRGF0YUxlbmd0aHMgPSB0aGlzLmRhdGFzZXRzLm1hcCh4ID0+IHguZGF0YS5sZW5ndGgpO1xuXG4gICAgICB3YW50VXBkYXRlKFVwZGF0ZVR5cGUuVXBkYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoISF0aGlzLmNvbG9ycyAhPT0gdGhpcy5vbGQuY29sb3JzRXhpc3RzKSB7XG4gICAgICB0aGlzLm9sZC5jb2xvcnNFeGlzdHMgPSAhIXRoaXMuY29sb3JzO1xuXG4gICAgICB0aGlzLnVwZGF0ZUNvbG9ycygpO1xuXG4gICAgICB3YW50VXBkYXRlKFVwZGF0ZVR5cGUuVXBkYXRlKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIHNtZWxscyBvZiBpbmVmZmljaWVuY3ksIG1pZ2h0IG5lZWQgdG8gcmV2aXNpdCB0aGlzXG4gICAgaWYgKHRoaXMuY29sb3JzICYmIHRoaXMuY29sb3JzLmZpbHRlcigoeCwgaSkgPT4gIXRoaXMuY29sb3JzRXF1YWwoeCwgdGhpcy5vbGQuY29sb3JzW2ldKSkubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9sZC5jb2xvcnMgPSB0aGlzLmNvbG9ycy5tYXAoeCA9PiB0aGlzLmNvcHlDb2xvcih4KSk7XG5cbiAgICAgIHRoaXMudXBkYXRlQ29sb3JzKCk7XG5cbiAgICAgIHdhbnRVcGRhdGUoVXBkYXRlVHlwZS5VcGRhdGUpO1xuICAgIH1cblxuICAgIGlmICghIXRoaXMubGFiZWxzICE9PSB0aGlzLm9sZC5sYWJlbHNFeGlzdCkge1xuICAgICAgdGhpcy5vbGQubGFiZWxzRXhpc3QgPSAhIXRoaXMubGFiZWxzO1xuXG4gICAgICB3YW50VXBkYXRlKFVwZGF0ZVR5cGUuVXBkYXRlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZmlsdGVyKCh4LCBpKSA9PiAhdGhpcy5sYWJlbHNFcXVhbCh4LCB0aGlzLm9sZC5sYWJlbHNbaV0pKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMub2xkLmxhYmVscyA9IHRoaXMubGFiZWxzLm1hcCh4ID0+IHRoaXMuY29weUxhYmVsKHgpKTtcblxuICAgICAgd2FudFVwZGF0ZShVcGRhdGVUeXBlLlVwZGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKCEhdGhpcy5vcHRpb25zLmxlZ2VuZCAhPT0gdGhpcy5vbGQubGVnZW5kRXhpc3RzKSB7XG4gICAgICB0aGlzLm9sZC5sZWdlbmRFeGlzdHMgPSAhIXRoaXMub3B0aW9ucy5sZWdlbmQ7XG5cbiAgICAgIHdhbnRVcGRhdGUoVXBkYXRlVHlwZS5SZWZyZXNoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmxlZ2VuZCAmJiB0aGlzLm9wdGlvbnMubGVnZW5kLnBvc2l0aW9uICE9PSB0aGlzLm9sZC5sZWdlbmQucG9zaXRpb24pIHtcbiAgICAgIHRoaXMub2xkLmxlZ2VuZC5wb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5sZWdlbmQucG9zaXRpb247XG5cbiAgICAgIHdhbnRVcGRhdGUoVXBkYXRlVHlwZS5SZWZyZXNoKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHVwZGF0ZVJlcXVpcmVkIGFzIFVwZGF0ZVR5cGUpIHtcbiAgICAgIGNhc2UgVXBkYXRlVHlwZS5EZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVXBkYXRlVHlwZS5VcGRhdGU6XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBVcGRhdGVUeXBlLlJlZnJlc2g6XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb3B5TGFiZWwoYTogTGFiZWwpOiBMYWJlbCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICAgIHJldHVybiBbLi4uYV07XG4gICAgfVxuICAgIHJldHVybiBhO1xuICB9XG5cbiAgbGFiZWxzRXF1YWwoYTogTGFiZWwsIGI6IExhYmVsKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgICAgICYmIEFycmF5LmlzQXJyYXkoYSkgPT09IEFycmF5LmlzQXJyYXkoYilcbiAgICAgICYmIChBcnJheS5pc0FycmF5KGEpIHx8IGEgPT09IGIpXG4gICAgICAmJiAoIUFycmF5LmlzQXJyYXkoYSkgfHwgYS5sZW5ndGggPT09IGIubGVuZ3RoKVxuICAgICAgJiYgKCFBcnJheS5pc0FycmF5KGEpIHx8IGEuZmlsdGVyKCh4LCBpKSA9PiB4ICE9PSBiW2ldKS5sZW5ndGggPT09IDApXG4gICAgICA7XG4gIH1cblxuICBjb3B5Q29sb3IoYTogQ29sb3IpOiBDb2xvciB7XG4gICAgY29uc3QgcmM6IENvbG9yID0ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBhLmJhY2tncm91bmRDb2xvcixcbiAgICAgIGJvcmRlcldpZHRoOiBhLmJvcmRlcldpZHRoLFxuICAgICAgYm9yZGVyQ29sb3I6IGEuYm9yZGVyQ29sb3IsXG4gICAgICBib3JkZXJDYXBTdHlsZTogYS5ib3JkZXJDYXBTdHlsZSxcbiAgICAgIGJvcmRlckRhc2g6IGEuYm9yZGVyRGFzaCxcbiAgICAgIGJvcmRlckRhc2hPZmZzZXQ6IGEuYm9yZGVyRGFzaE9mZnNldCxcbiAgICAgIGJvcmRlckpvaW5TdHlsZTogYS5ib3JkZXJKb2luU3R5bGUsXG4gICAgICBwb2ludEJvcmRlckNvbG9yOiBhLnBvaW50Qm9yZGVyQ29sb3IsXG4gICAgICBwb2ludEJhY2tncm91bmRDb2xvcjogYS5wb2ludEJhY2tncm91bmRDb2xvcixcbiAgICAgIHBvaW50Qm9yZGVyV2lkdGg6IGEucG9pbnRCb3JkZXJXaWR0aCxcbiAgICAgIHBvaW50UmFkaXVzOiBhLnBvaW50UmFkaXVzLFxuICAgICAgcG9pbnRIb3ZlclJhZGl1czogYS5wb2ludEhvdmVyUmFkaXVzLFxuICAgICAgcG9pbnRIaXRSYWRpdXM6IGEucG9pbnRIaXRSYWRpdXMsXG4gICAgICBwb2ludEhvdmVyQmFja2dyb3VuZENvbG9yOiBhLnBvaW50SG92ZXJCYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBwb2ludEhvdmVyQm9yZGVyQ29sb3I6IGEucG9pbnRIb3ZlckJvcmRlckNvbG9yLFxuICAgICAgcG9pbnRIb3ZlckJvcmRlcldpZHRoOiBhLnBvaW50SG92ZXJCb3JkZXJXaWR0aCxcbiAgICAgIHBvaW50U3R5bGU6IGEucG9pbnRTdHlsZSxcbiAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBhLmhvdmVyQmFja2dyb3VuZENvbG9yLFxuICAgICAgaG92ZXJCb3JkZXJDb2xvcjogYS5ob3ZlckJvcmRlckNvbG9yLFxuICAgICAgaG92ZXJCb3JkZXJXaWR0aDogYS5ob3ZlckJvcmRlcldpZHRoLFxuICAgIH07XG5cbiAgICByZXR1cm4gcmM7XG4gIH1cblxuICBjb2xvcnNFcXVhbChhOiBDb2xvciwgYjogQ29sb3IpIHtcbiAgICBpZiAoIWEgIT09ICFiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAhYSB8fCB0cnVlXG4gICAgICAmJiAoYS5iYWNrZ3JvdW5kQ29sb3IgPT09IGIuYmFja2dyb3VuZENvbG9yKVxuICAgICAgJiYgKGEuYm9yZGVyV2lkdGggPT09IGIuYm9yZGVyV2lkdGgpXG4gICAgICAmJiAoYS5ib3JkZXJDb2xvciA9PT0gYi5ib3JkZXJDb2xvcilcbiAgICAgICYmIChhLmJvcmRlckNhcFN0eWxlID09PSBiLmJvcmRlckNhcFN0eWxlKVxuICAgICAgJiYgKGEuYm9yZGVyRGFzaCA9PT0gYi5ib3JkZXJEYXNoKVxuICAgICAgJiYgKGEuYm9yZGVyRGFzaE9mZnNldCA9PT0gYi5ib3JkZXJEYXNoT2Zmc2V0KVxuICAgICAgJiYgKGEuYm9yZGVySm9pblN0eWxlID09PSBiLmJvcmRlckpvaW5TdHlsZSlcbiAgICAgICYmIChhLnBvaW50Qm9yZGVyQ29sb3IgPT09IGIucG9pbnRCb3JkZXJDb2xvcilcbiAgICAgICYmIChhLnBvaW50QmFja2dyb3VuZENvbG9yID09PSBiLnBvaW50QmFja2dyb3VuZENvbG9yKVxuICAgICAgJiYgKGEucG9pbnRCb3JkZXJXaWR0aCA9PT0gYi5wb2ludEJvcmRlcldpZHRoKVxuICAgICAgJiYgKGEucG9pbnRSYWRpdXMgPT09IGIucG9pbnRSYWRpdXMpXG4gICAgICAmJiAoYS5wb2ludEhvdmVyUmFkaXVzID09PSBiLnBvaW50SG92ZXJSYWRpdXMpXG4gICAgICAmJiAoYS5wb2ludEhpdFJhZGl1cyA9PT0gYi5wb2ludEhpdFJhZGl1cylcbiAgICAgICYmIChhLnBvaW50SG92ZXJCYWNrZ3JvdW5kQ29sb3IgPT09IGIucG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcilcbiAgICAgICYmIChhLnBvaW50SG92ZXJCb3JkZXJDb2xvciA9PT0gYi5wb2ludEhvdmVyQm9yZGVyQ29sb3IpXG4gICAgICAmJiAoYS5wb2ludEhvdmVyQm9yZGVyV2lkdGggPT09IGIucG9pbnRIb3ZlckJvcmRlcldpZHRoKVxuICAgICAgJiYgKGEucG9pbnRTdHlsZSA9PT0gYi5wb2ludFN0eWxlKVxuICAgICAgJiYgKGEuaG92ZXJCYWNrZ3JvdW5kQ29sb3IgPT09IGIuaG92ZXJCYWNrZ3JvdW5kQ29sb3IpXG4gICAgICAmJiAoYS5ob3ZlckJvcmRlckNvbG9yID09PSBiLmhvdmVyQm9yZGVyQ29sb3IpXG4gICAgICAmJiAoYS5ob3ZlckJvcmRlcldpZHRoID09PSBiLmhvdmVyQm9yZGVyV2lkdGgpXG4gICAgICA7XG4gIH1cblxuICB1cGRhdGVDb2xvcnMoKSB7XG4gICAgdGhpcy5kYXRhc2V0cy5mb3JFYWNoKChlbG0sIGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5jb2xvcnMgJiYgdGhpcy5jb2xvcnNbaW5kZXhdKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZWxtLCB0aGlzLmNvbG9yc1tpbmRleF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbG0sIGdldENvbG9ycyh0aGlzLmNoYXJ0VHlwZSwgaW5kZXgsIGVsbS5kYXRhLmxlbmd0aCksIHsgLi4uZWxtIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBsZXQgdXBkYXRlUmVxdWlyZWQgPSBVcGRhdGVUeXBlLkRlZmF1bHQ7XG4gICAgY29uc3Qgd2FudFVwZGF0ZSA9ICh4OiBVcGRhdGVUeXBlKSA9PiB7XG4gICAgICB1cGRhdGVSZXF1aXJlZCA9IHggPiB1cGRhdGVSZXF1aXJlZCA/IHggOiB1cGRhdGVSZXF1aXJlZDtcbiAgICB9O1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGNoYW5nZXMgYXJlIGluIHRoZSBkYXRhIG9yIGRhdGFzZXRzIG9yIGxhYmVscyBvciBsZWdlbmRcblxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdkYXRhJykgJiYgY2hhbmdlcy5kYXRhLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5wcm9wYWdhdGVEYXRhVG9EYXRhc2V0cyhjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlKTtcblxuICAgICAgd2FudFVwZGF0ZShVcGRhdGVUeXBlLlVwZGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2RhdGFzZXRzJykgJiYgY2hhbmdlcy5kYXRhc2V0cy5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucHJvcGFnYXRlRGF0YXNldHNUb0RhdGEoY2hhbmdlcy5kYXRhc2V0cy5jdXJyZW50VmFsdWUpO1xuXG4gICAgICB3YW50VXBkYXRlKFVwZGF0ZVR5cGUuVXBkYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnbGFiZWxzJykpIHtcbiAgICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICAgIHRoaXMuY2hhcnQuZGF0YS5sYWJlbHMgPSBjaGFuZ2VzLmxhYmVscy5jdXJyZW50VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHdhbnRVcGRhdGUoVXBkYXRlVHlwZS5VcGRhdGUpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdsZWdlbmQnKSkge1xuICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgICAgdGhpcy5jaGFydC5jb25maWcub3B0aW9ucy5sZWdlbmQuZGlzcGxheSA9IGNoYW5nZXMubGVnZW5kLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgdGhpcy5jaGFydC5nZW5lcmF0ZUxlZ2VuZCgpO1xuICAgICAgfVxuXG4gICAgICB3YW50VXBkYXRlKFVwZGF0ZVR5cGUuVXBkYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKSB7XG4gICAgICB3YW50VXBkYXRlKFVwZGF0ZVR5cGUuUmVmcmVzaCk7XG4gICAgfVxuXG4gICAgc3dpdGNoICh1cGRhdGVSZXF1aXJlZCBhcyBVcGRhdGVUeXBlKSB7XG4gICAgICBjYXNlIFVwZGF0ZVR5cGUuVXBkYXRlOlxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVXBkYXRlVHlwZS5SZWZyZXNoOlxuICAgICAgY2FzZSBVcGRhdGVUeXBlLkRlZmF1bHQ6XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5jaGFydCA9IHZvaWQgMDtcbiAgICB9XG4gICAgdGhpcy5zdWJzLmZvckVhY2goeCA9PiB4LnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkdXJhdGlvbj86IGFueSwgbGF6eT86IGFueSkge1xuICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGFydC51cGRhdGUoZHVyYXRpb24sIGxhenkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoaWRlRGF0YXNldChpbmRleDogbnVtYmVyLCBoaWRkZW46IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNoYXJ0LmdldERhdGFzZXRNZXRhKGluZGV4KS5oaWRkZW4gPSBoaWRkZW47XG4gICAgdGhpcy5jaGFydC51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0RhdGFzZXRIaWRkZW4oaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoYXJ0LmdldERhdGFzZXRNZXRhKGluZGV4KS5oaWRkZW47XG4gIH1cblxuICBwdWJsaWMgdG9CYXNlNjRJbWFnZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNoYXJ0LnRvQmFzZTY0SW1hZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDaGFydENvbmZpZ3VyYXRpb24oKTogY2hhcnRKcy5DaGFydENvbmZpZ3VyYXRpb24ge1xuICAgIGNvbnN0IGRhdGFzZXRzID0gdGhpcy5nZXREYXRhc2V0cygpO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKHRoaXMubGVnZW5kID09PSBmYWxzZSkge1xuICAgICAgb3B0aW9ucy5sZWdlbmQgPSB7IGRpc3BsYXk6IGZhbHNlIH07XG4gICAgfVxuICAgIC8vIGhvb2sgZm9yIG9uSG92ZXIgYW5kIG9uQ2xpY2sgZXZlbnRzXG4gICAgb3B0aW9ucy5ob3ZlciA9IG9wdGlvbnMuaG92ZXIgfHwge307XG4gICAgaWYgKCFvcHRpb25zLmhvdmVyLm9uSG92ZXIpIHtcbiAgICAgIG9wdGlvbnMuaG92ZXIub25Ib3ZlciA9IChldmVudDogTW91c2VFdmVudCwgYWN0aXZlOiB7fVtdKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmUgJiYgIWFjdGl2ZS5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFydEhvdmVyLmVtaXQoeyBldmVudCwgYWN0aXZlIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMub25DbGljaykge1xuICAgICAgb3B0aW9ucy5vbkNsaWNrID0gKGV2ZW50PzogTW91c2VFdmVudCwgYWN0aXZlPzoge31bXSkgPT4ge1xuICAgICAgICB0aGlzLmNoYXJ0Q2xpY2suZW1pdCh7IGV2ZW50LCBhY3RpdmUgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSB0aGlzLnNtYXJ0TWVyZ2Uob3B0aW9ucywgdGhpcy50aGVtZVNlcnZpY2UuZ2V0Q29sb3JzY2hlbWVzT3B0aW9ucygpKTtcblxuICAgIGNvbnN0IGNoYXJ0Q29uZmlnOiBjaGFydEpzLkNoYXJ0Q29uZmlndXJhdGlvbiA9IHtcbiAgICAgIHR5cGU6IHRoaXMuY2hhcnRUeXBlLFxuICAgICAgZGF0YToge1xuICAgICAgICBsYWJlbHM6IHRoaXMubGFiZWxzIHx8IFtdLFxuICAgICAgICBkYXRhc2V0c1xuICAgICAgfSxcbiAgICAgIHBsdWdpbnM6IHRoaXMucGx1Z2lucyxcbiAgICAgIG9wdGlvbnM6IG1lcmdlZE9wdGlvbnMsXG4gICAgfTtcblxuICAgIHJldHVybiBjaGFydENvbmZpZztcbiAgfVxuXG4gIHB1YmxpYyBnZXRDaGFydEJ1aWxkZXIoY3R4OiBzdHJpbmcvKiwgZGF0YTphbnlbXSwgb3B0aW9uczphbnkqLyk6IENoYXJ0IHtcbiAgICBjb25zdCBjaGFydENvbmZpZyA9IHRoaXMuZ2V0Q2hhcnRDb25maWd1cmF0aW9uKCk7XG4gICAgcmV0dXJuIG5ldyBjaGFydEpzLkNoYXJ0KGN0eCwgY2hhcnRDb25maWcpO1xuICB9XG5cbiAgc21hcnRNZXJnZShvcHRpb25zOiBhbnksIG92ZXJyaWRlczogYW55LCBsZXZlbDogbnVtYmVyID0gMCk6IGFueSB7XG4gICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICBvcHRpb25zID0gY2xvbmVEZWVwKG9wdGlvbnMpO1xuICAgIH1cbiAgICBjb25zdCBrZXlzVG9VcGRhdGUgPSBPYmplY3Qua2V5cyhvdmVycmlkZXMpO1xuICAgIGtleXNUb1VwZGF0ZS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvdmVycmlkZXNba2V5XSkpIHtcbiAgICAgICAgY29uc3QgYXJyYXlFbGVtZW50cyA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgaWYgKGFycmF5RWxlbWVudHMpIHtcbiAgICAgICAgICBhcnJheUVsZW1lbnRzLmZvckVhY2gociA9PiB7XG4gICAgICAgICAgICB0aGlzLnNtYXJ0TWVyZ2Uociwgb3ZlcnJpZGVzW2tleV1bMF0sIGxldmVsICsgMSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIChvdmVycmlkZXNba2V5XSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmICghKGtleSBpbiBvcHRpb25zKSkge1xuICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc21hcnRNZXJnZShvcHRpb25zW2tleV0sIG92ZXJyaWRlc1trZXldLCBsZXZlbCArIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9uc1trZXldID0gb3ZlcnJpZGVzW2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzTXVsdGlMaW5lTGFiZWwobGFiZWw6IExhYmVsKTogbGFiZWwgaXMgTXVsdGlMaW5lTGFiZWwge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGxhYmVsKTtcbiAgfVxuXG4gIHByaXZhdGUgam9pbkxhYmVsKGxhYmVsOiBMYWJlbCk6IHN0cmluZyB7XG4gICAgaWYgKCFsYWJlbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzTXVsdGlMaW5lTGFiZWwobGFiZWwpKSB7XG4gICAgICByZXR1cm4gbGFiZWwuam9pbignICcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbGFiZWw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcm9wYWdhdGVEYXRhc2V0c1RvRGF0YShkYXRhc2V0czogY2hhcnRKcy5DaGFydERhdGFTZXRzW10pIHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGFzZXRzLm1hcChyID0+IHIuZGF0YSk7XG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgIHRoaXMuY2hhcnQuZGF0YS5kYXRhc2V0cyA9IGRhdGFzZXRzO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUNvbG9ycygpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9wYWdhdGVEYXRhVG9EYXRhc2V0cyhuZXdEYXRhVmFsdWVzOiBTaW5nbGVPck11bHRpRGF0YVNldCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTXVsdGlEYXRhU2V0KG5ld0RhdGFWYWx1ZXMpKSB7XG4gICAgICBpZiAodGhpcy5kYXRhc2V0cyAmJiBuZXdEYXRhVmFsdWVzLmxlbmd0aCA9PT0gdGhpcy5kYXRhc2V0cy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0cy5mb3JFYWNoKChkYXRhc2V0LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICBkYXRhc2V0LmRhdGEgPSBuZXdEYXRhVmFsdWVzW2ldO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGF0YXNldHMgPSBuZXdEYXRhVmFsdWVzLm1hcCgoZGF0YTogbnVtYmVyW10sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICByZXR1cm4geyBkYXRhLCBsYWJlbDogdGhpcy5qb2luTGFiZWwodGhpcy5sYWJlbHNbaW5kZXhdKSB8fCBgTGFiZWwgJHtpbmRleH1gIH07XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgICAgIHRoaXMuY2hhcnQuZGF0YS5kYXRhc2V0cyA9IHRoaXMuZGF0YXNldHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLmRhdGFzZXRzKSB7XG4gICAgICAgIHRoaXMuZGF0YXNldHMgPSBbeyBkYXRhOiBuZXdEYXRhVmFsdWVzIH1dO1xuICAgICAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgICAgIHRoaXMuY2hhcnQuZGF0YS5kYXRhc2V0cyA9IHRoaXMuZGF0YXNldHM7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGF0YXNldHNbMF0uZGF0YSA9IG5ld0RhdGFWYWx1ZXM7XG4gICAgICAgIHRoaXMuZGF0YXNldHMuc3BsaWNlKDEpOyAvLyBSZW1vdmUgYWxsIGVsZW1lbnRzIGJ1dCB0aGUgZmlyc3RcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGVDb2xvcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNNdWx0aURhdGFTZXQoZGF0YTogU2luZ2xlT3JNdWx0aURhdGFTZXQpOiBkYXRhIGlzIE11bHRpRGF0YVNldCB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZGF0YVswXSk7XG4gIH1cblxuICBwcml2YXRlIGdldERhdGFzZXRzKCkge1xuICAgIGlmICghdGhpcy5kYXRhc2V0cyAmJiAhdGhpcy5kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYG5nLWNoYXJ0cyBjb25maWd1cmF0aW9uIGVycm9yLCBkYXRhIG9yIGRhdGFzZXRzIGZpZWxkIGFyZSByZXF1aXJlZCB0byByZW5kZXIgY2hhcnQgJHt0aGlzLmNoYXJ0VHlwZX1gKTtcbiAgICB9XG5cbiAgICAvLyBJZiBgZGF0YXNldHNgIGlzIGRlZmluZWQsIHVzZSBpdCBvdmVyIHRoZSBgZGF0YWAgcHJvcGVydHkuXG4gICAgaWYgKHRoaXMuZGF0YXNldHMpIHtcbiAgICAgIHRoaXMucHJvcGFnYXRlRGF0YXNldHNUb0RhdGEodGhpcy5kYXRhc2V0cyk7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhc2V0cztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRhKSB7XG4gICAgICB0aGlzLnByb3BhZ2F0ZURhdGFUb0RhdGFzZXRzKHRoaXMuZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhc2V0cztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2goKSB7XG4gICAgLy8gaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucmVzcG9uc2l2ZSkge1xuICAgIC8vICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlZnJlc2goKSwgNTApO1xuICAgIC8vIH1cblxuICAgIC8vIHRvZG86IHJlbW92ZSB0aGlzIGxpbmUsIGl0IGlzIHByb2R1Y2luZyBmbGlja2VyaW5nXG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5jaGFydCA9IHZvaWQgMDtcbiAgICB9XG4gICAgaWYgKHRoaXMuY3R4KSB7XG4gICAgICB0aGlzLmNoYXJ0ID0gdGhpcy5nZXRDaGFydEJ1aWxkZXIodGhpcy5jdHgvKiwgZGF0YSwgdGhpcy5vcHRpb25zKi8pO1xuICAgIH1cbiAgfVxufVxuIl19