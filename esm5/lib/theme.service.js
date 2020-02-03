/**
 * @fileoverview added by tsickle
 * Generated from: lib/theme.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
var ThemeService = /** @class */ (function () {
    function ThemeService() {
        this.pColorschemesOptions = {};
        this.colorschemesOptions = new BehaviorSubject({});
    }
    /**
     * @param {?} options
     * @return {?}
     */
    ThemeService.prototype.setColorschemesOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.pColorschemesOptions = options;
        this.colorschemesOptions.next(options);
    };
    /**
     * @return {?}
     */
    ThemeService.prototype.getColorschemesOptions = /**
     * @return {?}
     */
    function () {
        return this.pColorschemesOptions;
    };
    ThemeService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ThemeService.ctorParameters = function () { return []; };
    /** @nocollapse */ ThemeService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ThemeService_Factory() { return new ThemeService(); }, token: ThemeService, providedIn: "root" });
    return ThemeService;
}());
export { ThemeService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ThemeService.prototype.pColorschemesOptions;
    /** @type {?} */
    ThemeService.prototype.colorschemesOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvdGhlbWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHdkM7SUFPRTtRQUhRLHlCQUFvQixHQUFpQixFQUFFLENBQUM7UUFDekMsd0JBQW1CLEdBQUcsSUFBSSxlQUFlLENBQWUsRUFBRSxDQUFDLENBQUM7SUFFbkQsQ0FBQzs7Ozs7SUFFakIsNkNBQXNCOzs7O0lBQXRCLFVBQXVCLE9BQXFCO1FBQzFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUM7UUFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsNkNBQXNCOzs7SUFBdEI7UUFDRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNuQyxDQUFDOztnQkFoQkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7dUJBTkQ7Q0FxQkMsQUFqQkQsSUFpQkM7U0FkWSxZQUFZOzs7Ozs7SUFDdkIsNENBQWdEOztJQUNoRCwyQ0FBbUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENoYXJ0T3B0aW9ucyB9IGZyb20gJ2NoYXJ0LmpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGhlbWVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBwQ29sb3JzY2hlbWVzT3B0aW9uczogQ2hhcnRPcHRpb25zID0ge307XG4gIHB1YmxpYyBjb2xvcnNjaGVtZXNPcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDaGFydE9wdGlvbnM+KHt9KTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHNldENvbG9yc2NoZW1lc09wdGlvbnMob3B0aW9uczogQ2hhcnRPcHRpb25zKSB7XG4gICAgdGhpcy5wQ29sb3JzY2hlbWVzT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5jb2xvcnNjaGVtZXNPcHRpb25zLm5leHQob3B0aW9ucyk7XG4gIH1cblxuICBnZXRDb2xvcnNjaGVtZXNPcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnBDb2xvcnNjaGVtZXNPcHRpb25zO1xuICB9XG59XG4iXX0=