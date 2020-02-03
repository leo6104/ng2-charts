/**
 * @fileoverview added by tsickle
 * Generated from: lib/monkey-patch-chart-js-tooltip.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:variable-name
// tslint:disable:no-var-keyword
// tslint:disable:prefer-const
// tslint:disable:only-arrow-functions
// tslint:disable:one-variable-per-declaration
// tslint:disable:object-literal-shorthand
// tslint:disable:space-before-function-paren
/**
 * @return {?}
 */
export function monkeyPatchChartJsTooltip() {
    if (typeof Chart === 'undefined') {
        console.log('Chart not defined (guessing this is a universal build, and I don\'t know why this happens -- Aviad)');
        return;
    }
    Chart.Tooltip.prototype.drawBody = drawBody;
    /** @type {?} */
    const helpers = Chart.helpers;
    /**
     * @param {?} vm
     * @param {?} align
     * @return {?}
     */
    function getAlignedX(vm, align) {
        return align === 'center'
            ? vm.x + vm.width / 2
            : align === 'right'
                ? vm.x + vm.width - vm.xPadding
                : vm.x + vm.xPadding;
    }
    /**
     * @param {?} pt
     * @param {?} vm
     * @param {?} ctx
     * @return {?}
     */
    function drawBody(pt, vm, ctx) {
        /** @type {?} */
        var bodyFontSize = vm.bodyFontSize;
        /** @type {?} */
        var bodySpacing = vm.bodySpacing;
        /** @type {?} */
        var bodyAlign = vm._bodyAlign;
        /** @type {?} */
        var body = vm.body;
        /** @type {?} */
        var drawColorBoxes = vm.displayColors;
        /** @type {?} */
        var labelColors = vm.labelColors;
        /** @type {?} */
        var xLinePadding = 0;
        /** @type {?} */
        var colorX = drawColorBoxes ? getAlignedX(vm, 'left') : 0;
        /** @type {?} */
        var textColor;
        ctx.textAlign = bodyAlign;
        ctx.textBaseline = 'top';
        ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
        pt.x = getAlignedX(vm, bodyAlign);
        // Before Body
        /** @type {?} */
        var fillLineOfText = (/**
         * @param {?} line
         * @return {?}
         */
        function (line) {
            ctx.fillText(line, pt.x + xLinePadding, pt.y);
            pt.y += bodyFontSize + bodySpacing;
        });
        // Before body lines
        ctx.fillStyle = vm.bodyFontColor;
        helpers.each(vm.beforeBody, fillLineOfText);
        xLinePadding = drawColorBoxes && bodyAlign !== 'right'
            ? bodyAlign === 'center' ? (bodyFontSize / 2 + 1) : (bodyFontSize + 2)
            : 0;
        // Draw body lines now
        helpers.each(body, (/**
         * @param {?} bodyItem
         * @param {?} i
         * @return {?}
         */
        function (bodyItem, i) {
            textColor = vm.labelTextColors[i];
            ctx.fillStyle = textColor;
            helpers.each(bodyItem.before, fillLineOfText);
            // Draw Legend-like boxes if needed
            if (drawColorBoxes) {
                // Fill a white rect so that colours merge nicely if the opacity is < 1
                ctx.fillStyle = vm.legendColorBackground;
                ctx.fillRect(colorX, pt.y, bodyFontSize, bodyFontSize);
                // Border
                ctx.lineWidth = 1;
                ctx.strokeStyle = labelColors[i].borderColor;
                ctx.strokeRect(colorX, pt.y, bodyFontSize, bodyFontSize);
                // Inner square
                ctx.fillStyle = labelColors[i].backgroundColor;
                ctx.fillRect(colorX + 1, pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);
                ctx.fillStyle = textColor;
            }
            helpers.each(bodyItem.lines, fillLineOfText);
            helpers.each(bodyItem.after, fillLineOfText);
        }));
        // Reset back to 0 for after body
        xLinePadding = 0;
        // After body lines
        helpers.each(vm.afterBody, fillLineOfText);
        pt.y -= bodySpacing; // Remove last body spacing
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ua2V5LXBhdGNoLWNoYXJ0LWpzLXRvb2x0aXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL21vbmtleS1wYXRjaC1jaGFydC1qcy10b29sdGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxNQUFNLFVBQVUseUJBQXlCO0lBQ3ZDLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUdBQXFHLENBQUMsQ0FBQztRQUNuSCxPQUFPO0tBQ1I7SUFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztVQUN0QyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87Ozs7OztJQUU3QixTQUFTLFdBQVcsQ0FBQyxFQUFFLEVBQUUsS0FBSztRQUM1QixPQUFPLEtBQUssS0FBSyxRQUFRO1lBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQztZQUNyQixDQUFDLENBQUMsS0FBSyxLQUFLLE9BQU87Z0JBQ2pCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVE7Z0JBQy9CLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDM0IsQ0FBQzs7Ozs7OztJQUVELFNBQVMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRzs7WUFDdkIsWUFBWSxHQUFHLEVBQUUsQ0FBQyxZQUFZOztZQUM5QixXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVc7O1lBQzVCLFNBQVMsR0FBRyxFQUFFLENBQUMsVUFBVTs7WUFDekIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJOztZQUNkLGNBQWMsR0FBRyxFQUFFLENBQUMsYUFBYTs7WUFDakMsV0FB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RSxjQUFjLENBQUMsQ0FBQztRQUMvQyxDQUFDLEVBQUMsQ0FBQztRQUVILGlDQUFpQztRQUNqQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLG1CQUFtQjtRQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQywyQkFBMkI7SUFDbEQsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp2YXJpYWJsZS1uYW1lXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby12YXIta2V5d29yZFxuLy8gdHNsaW50OmRpc2FibGU6cHJlZmVyLWNvbnN0XG4vLyB0c2xpbnQ6ZGlzYWJsZTpvbmx5LWFycm93LWZ1bmN0aW9uc1xuLy8gdHNsaW50OmRpc2FibGU6b25lLXZhcmlhYmxlLXBlci1kZWNsYXJhdGlvblxuLy8gdHNsaW50OmRpc2FibGU6b2JqZWN0LWxpdGVyYWwtc2hvcnRoYW5kXG4vLyB0c2xpbnQ6ZGlzYWJsZTpzcGFjZS1iZWZvcmUtZnVuY3Rpb24tcGFyZW5cblxuZGVjbGFyZSBjbGFzcyBDaGFydCB7XG4gIHN0YXRpYyByZWFkb25seSBDaGFydDogdHlwZW9mIENoYXJ0O1xuICBzdGF0aWMgcmVhZG9ubHkgVG9vbHRpcDogYW55O1xuICBzdGF0aWMgcmVhZG9ubHkgaGVscGVyczogYW55O1xuICBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdHM6IGFueTtcbiAgc3RhdGljIHJlYWRvbmx5IHBsdWdpbnM6IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vbmtleVBhdGNoQ2hhcnRKc1Rvb2x0aXAoKSB7XG4gIGlmICh0eXBlb2YgQ2hhcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29uc29sZS5sb2coJ0NoYXJ0IG5vdCBkZWZpbmVkIChndWVzc2luZyB0aGlzIGlzIGEgdW5pdmVyc2FsIGJ1aWxkLCBhbmQgSSBkb25cXCd0IGtub3cgd2h5IHRoaXMgaGFwcGVucyAtLSBBdmlhZCknKTtcbiAgICByZXR1cm47XG4gIH1cbiAgQ2hhcnQuVG9vbHRpcC5wcm90b3R5cGUuZHJhd0JvZHkgPSBkcmF3Qm9keTtcbiAgY29uc3QgaGVscGVycyA9IENoYXJ0LmhlbHBlcnM7XG5cbiAgZnVuY3Rpb24gZ2V0QWxpZ25lZFgodm0sIGFsaWduKSB7XG4gICAgcmV0dXJuIGFsaWduID09PSAnY2VudGVyJ1xuICAgICAgPyB2bS54ICsgdm0ud2lkdGggLyAyXG4gICAgICA6IGFsaWduID09PSAncmlnaHQnXG4gICAgICAgID8gdm0ueCArIHZtLndpZHRoIC0gdm0ueFBhZGRpbmdcbiAgICAgICAgOiB2bS54ICsgdm0ueFBhZGRpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3Qm9keShwdCwgdm0sIGN0eCkge1xuICAgIHZhciBib2R5Rm9udFNpemUgPSB2bS5ib2R5Rm9udFNpemU7XG4gICAgdmFyIGJvZHlTcGFjaW5nID0gdm0uYm9keVNwYWNpbmc7XG4gICAgdmFyIGJvZHlBbGlnbiA9IHZtLl9ib2R5QWxpZ247XG4gICAgdmFyIGJvZHkgPSB2bS5ib2R5O1xuICAgIHZhciBkcmF3Q29sb3JCb3hlcyA9IHZtLmRpc3BsYXlDb2xvcnM7XG4gICAgdmFyIGxhYmVsQ29sb3JzID0gdm0ubGFiZWxDb2xvcnM7XG4gICAgdmFyIHhMaW5lUGFkZGluZyA9IDA7XG4gICAgdmFyIGNvbG9yWCA9IGRyYXdDb2xvckJveGVzID8gZ2V0QWxpZ25lZFgodm0sICdsZWZ0JykgOiAwO1xuICAgIHZhciB0ZXh0Q29sb3I7XG5cbiAgICBjdHgudGV4dEFsaWduID0gYm9keUFsaWduO1xuICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICBjdHguZm9udCA9IGhlbHBlcnMuZm9udFN0cmluZyhib2R5Rm9udFNpemUsIHZtLl9ib2R5Rm9udFN0eWxlLCB2bS5fYm9keUZvbnRGYW1pbHkpO1xuXG4gICAgcHQueCA9IGdldEFsaWduZWRYKHZtLCBib2R5QWxpZ24pO1xuXG4gICAgLy8gQmVmb3JlIEJvZHlcbiAgICB2YXIgZmlsbExpbmVPZlRleHQgPSBmdW5jdGlvbiAobGluZSkge1xuICAgICAgY3R4LmZpbGxUZXh0KGxpbmUsIHB0LnggKyB4TGluZVBhZGRpbmcsIHB0LnkpO1xuICAgICAgcHQueSArPSBib2R5Rm9udFNpemUgKyBib2R5U3BhY2luZztcbiAgICB9O1xuXG4gICAgLy8gQmVmb3JlIGJvZHkgbGluZXNcbiAgICBjdHguZmlsbFN0eWxlID0gdm0uYm9keUZvbnRDb2xvcjtcbiAgICBoZWxwZXJzLmVhY2godm0uYmVmb3JlQm9keSwgZmlsbExpbmVPZlRleHQpO1xuXG4gICAgeExpbmVQYWRkaW5nID0gZHJhd0NvbG9yQm94ZXMgJiYgYm9keUFsaWduICE9PSAncmlnaHQnXG4gICAgICA/IGJvZHlBbGlnbiA9PT0gJ2NlbnRlcicgPyAoYm9keUZvbnRTaXplIC8gMiArIDEpIDogKGJvZHlGb250U2l6ZSArIDIpXG4gICAgICA6IDA7XG5cbiAgICAvLyBEcmF3IGJvZHkgbGluZXMgbm93XG4gICAgaGVscGVycy5lYWNoKGJvZHksIGZ1bmN0aW9uIChib2R5SXRlbSwgaSkge1xuICAgICAgdGV4dENvbG9yID0gdm0ubGFiZWxUZXh0Q29sb3JzW2ldO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHRleHRDb2xvcjtcbiAgICAgIGhlbHBlcnMuZWFjaChib2R5SXRlbS5iZWZvcmUsIGZpbGxMaW5lT2ZUZXh0KTtcblxuICAgICAgLy8gRHJhdyBMZWdlbmQtbGlrZSBib3hlcyBpZiBuZWVkZWRcbiAgICAgIGlmIChkcmF3Q29sb3JCb3hlcykge1xuICAgICAgICAvLyBGaWxsIGEgd2hpdGUgcmVjdCBzbyB0aGF0IGNvbG91cnMgbWVyZ2UgbmljZWx5IGlmIHRoZSBvcGFjaXR5IGlzIDwgMVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdm0ubGVnZW5kQ29sb3JCYWNrZ3JvdW5kO1xuICAgICAgICBjdHguZmlsbFJlY3QoY29sb3JYLCBwdC55LCBib2R5Rm9udFNpemUsIGJvZHlGb250U2l6ZSk7XG5cbiAgICAgICAgLy8gQm9yZGVyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBsYWJlbENvbG9yc1tpXS5ib3JkZXJDb2xvcjtcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoY29sb3JYLCBwdC55LCBib2R5Rm9udFNpemUsIGJvZHlGb250U2l6ZSk7XG5cbiAgICAgICAgLy8gSW5uZXIgc3F1YXJlXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBsYWJlbENvbG9yc1tpXS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdChjb2xvclggKyAxLCBwdC55ICsgMSwgYm9keUZvbnRTaXplIC0gMiwgYm9keUZvbnRTaXplIC0gMik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0ZXh0Q29sb3I7XG4gICAgICB9XG5cbiAgICAgIGhlbHBlcnMuZWFjaChib2R5SXRlbS5saW5lcywgZmlsbExpbmVPZlRleHQpO1xuXG4gICAgICBoZWxwZXJzLmVhY2goYm9keUl0ZW0uYWZ0ZXIsIGZpbGxMaW5lT2ZUZXh0KTtcbiAgICB9KTtcblxuICAgIC8vIFJlc2V0IGJhY2sgdG8gMCBmb3IgYWZ0ZXIgYm9keVxuICAgIHhMaW5lUGFkZGluZyA9IDA7XG5cbiAgICAvLyBBZnRlciBib2R5IGxpbmVzXG4gICAgaGVscGVycy5lYWNoKHZtLmFmdGVyQm9keSwgZmlsbExpbmVPZlRleHQpO1xuICAgIHB0LnkgLT0gYm9keVNwYWNpbmc7IC8vIFJlbW92ZSBsYXN0IGJvZHkgc3BhY2luZ1xuICB9XG59XG4iXX0=