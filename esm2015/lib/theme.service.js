/**
 * @fileoverview added by tsickle
 * Generated from: lib/theme.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class ThemeService {
    constructor() {
        this.pColorschemesOptions = {};
        this.colorschemesOptions = new BehaviorSubject({});
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setColorschemesOptions(options) {
        this.pColorschemesOptions = options;
        this.colorschemesOptions.next(options);
    }
    /**
     * @return {?}
     */
    getColorschemesOptions() {
        return this.pColorschemesOptions;
    }
}
ThemeService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ThemeService.ctorParameters = () => [];
/** @nocollapse */ ThemeService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ThemeService_Factory() { return new ThemeService(); }, token: ThemeService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    ThemeService.prototype.pColorschemesOptions;
    /** @type {?} */
    ThemeService.prototype.colorschemesOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvdGhlbWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFNdkMsTUFBTSxPQUFPLFlBQVk7SUFJdkI7UUFIUSx5QkFBb0IsR0FBaUIsRUFBRSxDQUFDO1FBQ3pDLHdCQUFtQixHQUFHLElBQUksZUFBZSxDQUFlLEVBQUUsQ0FBQyxDQUFDO0lBRW5ELENBQUM7Ozs7O0lBRWpCLHNCQUFzQixDQUFDLE9BQXFCO1FBQzFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUM7UUFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsc0JBQXNCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7OztZQWhCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7Ozs7SUFFQyw0Q0FBZ0Q7O0lBQ2hELDJDQUFtRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hhcnRPcHRpb25zIH0gZnJvbSAnY2hhcnQuanMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUaGVtZVNlcnZpY2Uge1xuICBwcml2YXRlIHBDb2xvcnNjaGVtZXNPcHRpb25zOiBDaGFydE9wdGlvbnMgPSB7fTtcbiAgcHVibGljIGNvbG9yc2NoZW1lc09wdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENoYXJ0T3B0aW9ucz4oe30pO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgc2V0Q29sb3JzY2hlbWVzT3B0aW9ucyhvcHRpb25zOiBDaGFydE9wdGlvbnMpIHtcbiAgICB0aGlzLnBDb2xvcnNjaGVtZXNPcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmNvbG9yc2NoZW1lc09wdGlvbnMubmV4dChvcHRpb25zKTtcbiAgfVxuXG4gIGdldENvbG9yc2NoZW1lc09wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucENvbG9yc2NoZW1lc09wdGlvbnM7XG4gIH1cbn1cbiJdfQ==