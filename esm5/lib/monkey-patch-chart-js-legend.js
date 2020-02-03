/**
 * @fileoverview added by tsickle
 * Generated from: lib/monkey-patch-chart-js-legend.ts
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
export function monkeyPatchChartJsLegend() {
    if (typeof Chart === 'undefined') {
        console.log('Chart not defined (guessing this is a universal build, and I don\'t know why this happens -- Aviad)');
        return;
    }
    /** @type {?} */
    var plugins = Chart.plugins.getAll();
    /** @type {?} */
    var legend = plugins.filter((/**
     * @param {?} p
     * @return {?}
     */
    function (p) { return p.id === 'legend'; }))[0];
    legend._element.prototype.fit = fit;
    legend._element.prototype.draw = draw;
    /** @type {?} */
    var helpers = Chart.helpers;
    /** @type {?} */
    var defaults = Chart.defaults;
    /** @type {?} */
    var valueOrDefault = helpers.valueOrDefault;
    /**
     * @param {?} labelOpts
     * @param {?} fontSize
     * @return {?}
     */
    function getBoxWidth(labelOpts, fontSize) {
        return labelOpts.usePointStyle && labelOpts.boxWidth > fontSize ?
            fontSize :
            labelOpts.boxWidth;
    }
    /**
     * @return {?}
     */
    function fit() {
        /** @type {?} */
        var me = this;
        /** @type {?} */
        var opts = me.options;
        /** @type {?} */
        var labelOpts = opts.labels;
        /** @type {?} */
        var display = opts.display;
        /** @type {?} */
        var ctx = me.ctx;
        /** @type {?} */
        var labelFont = helpers.options._parseFont(labelOpts);
        /** @type {?} */
        var fontSize = labelFont.size;
        // Reset hit boxes
        /** @type {?} */
        var hitboxes = me.legendHitBoxes = [];
        /** @type {?} */
        var minSize = me.minSize;
        /** @type {?} */
        var isHorizontal = me.isHorizontal();
        if (isHorizontal) {
            minSize.width = me.maxWidth; // fill all the width
            minSize.height = display ? 10 : 0;
        }
        else {
            minSize.width = display ? 10 : 0;
            minSize.height = me.maxHeight; // fill all the height
        }
        /** @type {?} */
        var getMaxLineWidth = (/**
         * @param {?} textLines
         * @return {?}
         */
        function (textLines) {
            return textLines.map((/**
             * @param {?} textLine
             * @return {?}
             */
            function (textLine) {
                return ctx.measureText(textLine).width;
            })).reduce((/**
             * @param {?} acc
             * @param {?} v
             * @return {?}
             */
            function (acc, v) {
                return v > acc ? v : acc;
            }), 0);
        });
        // Increase sizes here
        if (display) {
            ctx.font = labelFont.string;
            if (isHorizontal) {
                // Labels
                // Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
                /** @type {?} */
                var lineWidths = me.lineWidths = [0];
                /** @type {?} */
                var lineHeights = me.lineHeights = [];
                /** @type {?} */
                var currentLineHeight = 0;
                /** @type {?} */
                var lineIndex = 0;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                helpers.each(me.legendItems, (/**
                 * @param {?} legendItem
                 * @param {?} i
                 * @return {?}
                 */
                function (legendItem, i) {
                    /** @type {?} */
                    var width;
                    /** @type {?} */
                    var height;
                    if (helpers.isArray(legendItem.text)) {
                        width = getMaxLineWidth(legendItem.text);
                        height = fontSize * legendItem.text.length + labelOpts.padding;
                    }
                    else {
                        width = ctx.measureText(legendItem.text).width;
                        height = fontSize + labelOpts.padding;
                    }
                    width += getBoxWidth(labelOpts, fontSize) + (fontSize / 2);
                    if (lineWidths[lineWidths.length - 1] + width + 2 * labelOpts.padding > minSize.width) {
                        lineHeights.push(currentLineHeight);
                        currentLineHeight = 0;
                        lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
                        lineIndex++;
                    }
                    legendItem.lineOrColumnIndex = lineIndex;
                    if (height > currentLineHeight) {
                        currentLineHeight = height;
                    }
                    // Store the hitbox width and height here. Final position will be updated in `draw`
                    hitboxes[i] = {
                        left: 0,
                        top: 0,
                        width: width,
                        height: height,
                    };
                    lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
                }));
                lineHeights.push(currentLineHeight);
                minSize.height += lineHeights.reduce((/**
                 * @param {?} acc
                 * @param {?} v
                 * @return {?}
                 */
                function (acc, v) {
                    return acc + v;
                }), 0);
            }
            else {
                /** @type {?} */
                var vPadding = labelOpts.padding;
                /** @type {?} */
                var columnWidths = me.columnWidths = [];
                /** @type {?} */
                var columnHeights = me.columnHeights = [];
                /** @type {?} */
                var totalWidth = labelOpts.padding;
                /** @type {?} */
                var currentColWidth = 0;
                /** @type {?} */
                var currentColHeight = 0;
                /** @type {?} */
                var columnIndex = 0;
                helpers.each(me.legendItems, (/**
                 * @param {?} legendItem
                 * @param {?} i
                 * @return {?}
                 */
                function (legendItem, i) {
                    /** @type {?} */
                    var itemWidth;
                    /** @type {?} */
                    var height;
                    if (helpers.isArray(legendItem.text)) {
                        itemWidth = getMaxLineWidth(legendItem.text);
                        height = fontSize * legendItem.text.length;
                    }
                    else {
                        itemWidth = ctx.measureText(legendItem.text).width;
                        height = fontSize;
                    }
                    itemWidth += getBoxWidth(labelOpts, fontSize) + (fontSize / 2);
                    // If too tall, go to new column
                    if (currentColHeight + fontSize + 2 * vPadding > minSize.height) {
                        totalWidth += currentColWidth + labelOpts.padding;
                        columnWidths.push(currentColWidth); // previous column width
                        columnHeights.push(currentColHeight);
                        currentColWidth = 0;
                        currentColHeight = 0;
                        columnIndex++;
                    }
                    legendItem.lineOrColumnIndex = columnIndex;
                    // Get max width
                    currentColWidth = Math.max(currentColWidth, itemWidth);
                    currentColHeight += height + vPadding;
                    // Store the hitbox width and height here. Final position will be updated in `draw`
                    hitboxes[i] = {
                        left: 0,
                        top: 0,
                        width: itemWidth,
                        height: height
                    };
                }));
                totalWidth += currentColWidth;
                columnWidths.push(currentColWidth);
                columnHeights.push(currentColHeight);
                minSize.width += totalWidth;
            }
        }
        me.width = minSize.width;
        me.height = minSize.height;
    }
    /**
     * @return {?}
     */
    function draw() {
        /** @type {?} */
        var me = this;
        /** @type {?} */
        var opts = me.options;
        /** @type {?} */
        var labelOpts = opts.labels;
        /** @type {?} */
        var globalDefaults = defaults.global;
        /** @type {?} */
        var defaultColor = globalDefaults.defaultColor;
        /** @type {?} */
        var lineDefault = globalDefaults.elements.line;
        /** @type {?} */
        var legendHeight = me.height;
        /** @type {?} */
        var columnHeights = me.columnHeights;
        /** @type {?} */
        var columnWidths = me.columnWidths;
        /** @type {?} */
        var legendWidth = me.width;
        /** @type {?} */
        var lineWidths = me.lineWidths;
        /** @type {?} */
        var lineHeights = me.lineHeights;
        if (opts.display) {
            /** @type {?} */
            var ctx = me.ctx;
            /** @type {?} */
            var fontColor = valueOrDefault(labelOpts.fontColor, globalDefaults.defaultFontColor);
            /** @type {?} */
            var labelFont = helpers.options._parseFont(labelOpts);
            /** @type {?} */
            var fontSize = labelFont.size;
            /** @type {?} */
            var cursor;
            // Canvas setup
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = fontColor; // for strikethrough effect
            ctx.fillStyle = fontColor; // render in correct colour
            ctx.font = labelFont.string;
            /** @type {?} */
            var boxWidth = getBoxWidth(labelOpts, fontSize);
            /** @type {?} */
            var hitboxes = me.legendHitBoxes;
            // current position
            /** @type {?} */
            var drawLegendBox = (/**
             * @param {?} x
             * @param {?} y
             * @param {?} legendItem
             * @return {?}
             */
            function (x, y, legendItem) {
                if (isNaN(boxWidth) || boxWidth <= 0) {
                    return;
                }
                // Set the ctx for the box
                ctx.save();
                /** @type {?} */
                var lineWidth = valueOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
                ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
                ctx.lineCap = valueOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
                ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
                ctx.lineJoin = valueOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
                if (ctx.setLineDash) {
                    // IE 9 and 10 do not support line dash
                    ctx.setLineDash(valueOrDefault(legendItem.lineDash, lineDefault.borderDash));
                }
                if (opts.labels && opts.labels.usePointStyle) {
                    // Recalculate x and y for drawPoint() because its expecting
                    // x and y to be center of figure (instead of top left)
                    /** @type {?} */
                    var radius = boxWidth * Math.SQRT2 / 2;
                    /** @type {?} */
                    var centerX = x + boxWidth / 2;
                    /** @type {?} */
                    var centerY = y + fontSize / 2;
                    // Draw pointStyle as legend symbol
                    helpers.canvas.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY);
                }
                else {
                    // Draw box as legend symbol
                    if (lineWidth !== 0) {
                        ctx.strokeRect(x, y, boxWidth, fontSize);
                    }
                    ctx.fillRect(x, y, boxWidth, fontSize);
                }
                ctx.restore();
            });
            /** @type {?} */
            var drawStrikeThrough = (/**
             * @param {?} x
             * @param {?} y
             * @param {?} w
             * @return {?}
             */
            function (x, y, w) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(x, y);
                ctx.lineTo(x + w, y);
                ctx.stroke();
            });
            /** @type {?} */
            var drawCrossOver = (/**
             * @param {?} x
             * @param {?} y
             * @param {?} w
             * @param {?} h
             * @return {?}
             */
            function (x, y, w, h) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(x, y);
                ctx.lineTo(x + w, y + h);
                ctx.moveTo(x, y + h);
                ctx.lineTo(x + w, y);
                ctx.stroke();
            });
            /** @type {?} */
            var fillText = (/**
             * @param {?} x
             * @param {?} y
             * @param {?} legendItem
             * @param {?} textWidth
             * @return {?}
             */
            function (x, y, legendItem, textWidth) {
                /** @type {?} */
                var halfFontSize = fontSize / 2;
                /** @type {?} */
                var xLeft = boxWidth + halfFontSize + x;
                /** @type {?} */
                var yMiddle = y + halfFontSize;
                if (helpers.isArray(legendItem.text)) {
                    helpers.each(legendItem.text, (/**
                     * @param {?} textLine
                     * @param {?} index
                     * @return {?}
                     */
                    function (textLine, index) {
                        /** @type {?} */
                        var lineOffset = index * fontSize;
                        ctx.fillText(textLine, xLeft, yMiddle + lineOffset);
                    }));
                }
                else {
                    ctx.fillText(legendItem.text, xLeft, yMiddle);
                }
                if (legendItem.hidden) {
                    if (helpers.isArray(legendItem.text)) {
                        drawCrossOver(xLeft, yMiddle, textWidth, (legendItem.text.length - 1) * (fontSize - 1));
                    }
                    else {
                        drawStrikeThrough(xLeft, yMiddle, textWidth);
                    }
                }
            });
            /** @type {?} */
            var alignmentOffset = (/**
             * @param {?} dimension
             * @param {?} blockSize
             * @return {?}
             */
            function (dimension, blockSize) {
                switch (opts.align) {
                    case 'start':
                        return labelOpts.padding;
                    case 'end':
                        return dimension - blockSize;
                    default: // center
                        return (dimension - blockSize + labelOpts.padding) / 2;
                }
            });
            // Horizontal
            /** @type {?} */
            var isHorizontal = me.isHorizontal();
            if (isHorizontal) {
                cursor = {
                    x: me.left + alignmentOffset(legendWidth, lineWidths[0]),
                    y: me.top + labelOpts.padding,
                    line: 0
                };
            }
            else {
                cursor = {
                    x: me.left + labelOpts.padding,
                    y: me.top + alignmentOffset(legendHeight, columnHeights[0]),
                    line: 0
                };
            }
            helpers.each(me.legendItems, (/**
             * @param {?} legendItem
             * @param {?} i
             * @return {?}
             */
            function (legendItem, i) {
                /** @type {?} */
                var textWidth;
                /** @type {?} */
                var height;
                /** @type {?} */
                var boxTopOffset;
                if (legendItem.lineOrColumnIndex > cursor.line) {
                    if (isHorizontal) {
                        cursor.y += lineHeights[cursor.line];
                        cursor.line = legendItem.lineOrColumnIndex;
                        cursor.x = me.left + alignmentOffset(legendWidth, lineWidths[cursor.line]);
                    }
                    else {
                        cursor.x += columnWidths[cursor.line] + labelOpts.padding;
                        cursor.line = legendItem.lineOrColumnIndex;
                        cursor.y = me.top + alignmentOffset(legendHeight, columnHeights[cursor.line]);
                    }
                }
                if (helpers.isArray(legendItem.text)) {
                    textWidth = legendItem.text.map((/**
                     * @param {?} textLine
                     * @return {?}
                     */
                    function (textLine) {
                        return ctx.measureText(textLine).width;
                    })).reduce((/**
                     * @param {?} acc
                     * @param {?} v
                     * @return {?}
                     */
                    function (acc, v) {
                        return v > acc ? v : acc;
                    }), 0);
                    boxTopOffset = fontSize / 2 * (legendItem.text.length - 1);
                    height = fontSize * legendItem.text.length;
                }
                else {
                    textWidth = ctx.measureText(legendItem.text).width;
                    boxTopOffset = 0;
                    height = fontSize;
                }
                /** @type {?} */
                var width = boxWidth + (fontSize / 2) + textWidth;
                /** @type {?} */
                var x = cursor.x;
                /** @type {?} */
                var y = cursor.y;
                /** @type {?} */
                var topOffset = isHorizontal ? Math.trunc((lineHeights[cursor.line] - hitboxes[i].height) / 2) : 0;
                drawLegendBox(x, y + boxTopOffset + topOffset, legendItem);
                hitboxes[i].left = x;
                hitboxes[i].top = y;
                // Fill the actual label
                fillText(x, y + topOffset, legendItem, textWidth);
                if (isHorizontal) {
                    cursor.x += width + labelOpts.padding;
                }
                else {
                    cursor.y += height + labelOpts.padding;
                }
            }));
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ua2V5LXBhdGNoLWNoYXJ0LWpzLWxlZ2VuZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbW9ua2V5LXBhdGNoLWNoYXJ0LWpzLWxlZ2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsTUFBTSxVQUFVLHdCQUF3QjtJQUN0QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFHQUFxRyxDQUFDLENBQUM7UUFDbkgsT0FBTztLQUNSOztRQUNLLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTs7UUFDaEMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNOzs7O0lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFBakIsQ0FBaUIsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O1FBRWhDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTzs7UUFDdkIsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFROztRQUN6QixjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWM7Ozs7OztJQUU3QyxTQUFTLFdBQVcsQ0FBQyxTQUFTLEVBQUUsUUFBUTtRQUN0QyxPQUFPLFNBQVMsQ0FBQyxhQUFhLElBQUksU0FBUyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUMvRCxRQUFRLENBQUMsQ0FBQztZQUNWLFNBQVMsQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELFNBQVMsR0FBRzs7WUFDTixFQUFFLEdBQUcsSUFBSTs7WUFDVCxJQUFJLEdBQUcsRUFBRSxDQUFDLE9BQU87O1lB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QkFDeEM7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp2YXJpYWJsZS1uYW1lXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby12YXIta2V5d29yZFxuLy8gdHNsaW50OmRpc2FibGU6cHJlZmVyLWNvbnN0XG4vLyB0c2xpbnQ6ZGlzYWJsZTpvbmx5LWFycm93LWZ1bmN0aW9uc1xuLy8gdHNsaW50OmRpc2FibGU6b25lLXZhcmlhYmxlLXBlci1kZWNsYXJhdGlvblxuLy8gdHNsaW50OmRpc2FibGU6b2JqZWN0LWxpdGVyYWwtc2hvcnRoYW5kXG4vLyB0c2xpbnQ6ZGlzYWJsZTpzcGFjZS1iZWZvcmUtZnVuY3Rpb24tcGFyZW5cblxuZGVjbGFyZSBjbGFzcyBDaGFydCB7XG4gIHN0YXRpYyByZWFkb25seSBDaGFydDogdHlwZW9mIENoYXJ0O1xuICBzdGF0aWMgcmVhZG9ubHkgVG9vbHRpcDogYW55O1xuICBzdGF0aWMgcmVhZG9ubHkgaGVscGVyczogYW55O1xuICBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdHM6IGFueTtcbiAgc3RhdGljIHJlYWRvbmx5IHBsdWdpbnM6IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vbmtleVBhdGNoQ2hhcnRKc0xlZ2VuZCgpIHtcbiAgaWYgKHR5cGVvZiBDaGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zb2xlLmxvZygnQ2hhcnQgbm90IGRlZmluZWQgKGd1ZXNzaW5nIHRoaXMgaXMgYSB1bml2ZXJzYWwgYnVpbGQsIGFuZCBJIGRvblxcJ3Qga25vdyB3aHkgdGhpcyBoYXBwZW5zIC0tIEF2aWFkKScpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwbHVnaW5zID0gQ2hhcnQucGx1Z2lucy5nZXRBbGwoKTtcbiAgY29uc3QgbGVnZW5kID0gcGx1Z2lucy5maWx0ZXIocCA9PiBwLmlkID09PSAnbGVnZW5kJylbMF07XG4gIGxlZ2VuZC5fZWxlbWVudC5wcm90b3R5cGUuZml0ID0gZml0O1xuICBsZWdlbmQuX2VsZW1lbnQucHJvdG90eXBlLmRyYXcgPSBkcmF3O1xuXG4gIGNvbnN0IGhlbHBlcnMgPSBDaGFydC5oZWxwZXJzO1xuICBjb25zdCBkZWZhdWx0cyA9IENoYXJ0LmRlZmF1bHRzO1xuICBjb25zdCB2YWx1ZU9yRGVmYXVsdCA9IGhlbHBlcnMudmFsdWVPckRlZmF1bHQ7XG5cbiAgZnVuY3Rpb24gZ2V0Qm94V2lkdGgobGFiZWxPcHRzLCBmb250U2l6ZSkge1xuICAgIHJldHVybiBsYWJlbE9wdHMudXNlUG9pbnRTdHlsZSAmJiBsYWJlbE9wdHMuYm94V2lkdGggPiBmb250U2l6ZSA/XG4gICAgICBmb250U2l6ZSA6XG4gICAgICBsYWJlbE9wdHMuYm94V2lkdGg7XG4gIH1cblxuICBmdW5jdGlvbiBmaXQoKSB7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICB2YXIgb3B0cyA9IG1lLm9wdGlvbnM7XG4gICAgdmFyIGxhYmVsT3B0cyA9IG9wdHMubGFiZWxzO1xuICAgIHZhciBkaXNwbGF5ID0gb3B0cy5kaXNwbGF5O1xuXG4gICAgdmFyIGN0eCA9IG1lLmN0eDtcblxuICAgIHZhciBsYWJlbEZvbnQgPSBoZWxwZXJzLm9wdGlvbnMuX3BhcnNlRm9udChsYWJlbE9wdHMpO1xuICAgIHZhciBmb250U2l6ZSA9IGxhYmVsRm9udC5zaXplO1xuXG4gICAgLy8gUmVzZXQgaGl0IGJveGVzXG4gICAgdmFyIGhpdGJveGVzID0gbWUubGVnZW5kSGl0Qm94ZXMgPSBbXTtcblxuICAgIHZhciBtaW5TaXplID0gbWUubWluU2l6ZTtcbiAgICB2YXIgaXNIb3Jpem9udGFsID0gbWUuaXNIb3Jpem9udGFsKCk7XG5cbiAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICBtaW5TaXplLndpZHRoID0gbWUubWF4V2lkdGg7IC8vIGZpbGwgYWxsIHRoZSB3aWR0aFxuICAgICAgbWluU2l6ZS5oZWlnaHQgPSBkaXNwbGF5ID8gMTAgOiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBtaW5TaXplLndpZHRoID0gZGlzcGxheSA/IDEwIDogMDtcbiAgICAgIG1pblNpemUuaGVpZ2h0ID0gbWUubWF4SGVpZ2h0OyAvLyBmaWxsIGFsbCB0aGUgaGVpZ2h0XG4gICAgfVxuXG4gICAgdmFyIGdldE1heExpbmVXaWR0aCA9IGZ1bmN0aW9uICh0ZXh0TGluZXMpIHtcbiAgICAgIHJldHVybiB0ZXh0TGluZXMubWFwKGZ1bmN0aW9uICh0ZXh0TGluZSkge1xuICAgICAgICByZXR1cm4gY3R4Lm1lYXN1cmVUZXh0KHRleHRMaW5lKS53aWR0aDtcbiAgICAgIH0pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCB2KSB7XG4gICAgICAgIHJldHVybiB2ID4gYWNjID8gdiA6IGFjYztcbiAgICAgIH0sIDApO1xuICAgIH07XG5cbiAgICAvLyBJbmNyZWFzZSBzaXplcyBoZXJlXG4gICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgIGN0eC5mb250ID0gbGFiZWxGb250LnN0cmluZztcblxuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuXG4gICAgICAgIC8vIExhYmVsc1xuXG4gICAgICAgIC8vIFdpZHRoIG9mIGVhY2ggbGluZSBvZiBsZWdlbmQgYm94ZXMuIExhYmVscyB3cmFwIG9udG8gbXVsdGlwbGUgbGluZXMgd2hlbiB0aGVyZSBhcmUgdG9vIG1hbnkgdG8gZml0IG9uIG9uZVxuICAgICAgICB2YXIgbGluZVdpZHRocyA9IG1lLmxpbmVXaWR0aHMgPSBbMF07XG4gICAgICAgIHZhciBsaW5lSGVpZ2h0cyA9IG1lLmxpbmVIZWlnaHRzID0gW107XG4gICAgICAgIHZhciBjdXJyZW50TGluZUhlaWdodCA9IDA7XG4gICAgICAgIHZhciBsaW5lSW5kZXggPSAwO1xuXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuICAgICAgICBoZWxwZXJzLmVhY2gobWUubGVnZW5kSXRlbXMsIGZ1bmN0aW9uIChsZWdlbmRJdGVtLCBpKSB7XG4gICAgICAgICAgdmFyIHdpZHRoLCBoZWlnaHQ7XG5cbiAgICAgICAgICBpZiAoaGVscGVycy5pc0FycmF5KGxlZ2VuZEl0ZW0udGV4dCkpIHtcbiAgICAgICAgICAgIHdpZHRoID0gZ2V0TWF4TGluZVdpZHRoKGxlZ2VuZEl0ZW0udGV4dCk7XG4gICAgICAgICAgICBoZWlnaHQgPSBmb250U2l6ZSAqIGxlZ2VuZEl0ZW0udGV4dC5sZW5ndGggKyBsYWJlbE9wdHMucGFkZGluZztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkdGggPSBjdHgubWVhc3VyZVRleHQobGVnZW5kSXRlbS50ZXh0KS53aWR0aDtcbiAgICAgICAgICAgIGhlaWdodCA9IGZvbnRTaXplICsgbGFiZWxPcHRzLnBhZGRpbmc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpZHRoICs9IGdldEJveFdpZHRoKGxhYmVsT3B0cywgZm9udFNpemUpICsgKGZvbnRTaXplIC8gMik7XG5cbiAgICAgICAgICBpZiAobGluZVdpZHRoc1tsaW5lV2lkdGhzLmxlbmd0aCAtIDFdICsgd2lkdGggKyAyICogbGFiZWxPcHRzLnBhZGRpbmcgPiBtaW5TaXplLndpZHRoKSB7XG4gICAgICAgICAgICBsaW5lSGVpZ2h0cy5wdXNoKGN1cnJlbnRMaW5lSGVpZ2h0KTtcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lSGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIGxpbmVXaWR0aHNbbGluZVdpZHRocy5sZW5ndGggLSAoaSA+IDAgPyAwIDogMSldID0gMDtcbiAgICAgICAgICAgIGxpbmVJbmRleCsrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxlZ2VuZEl0ZW0ubGluZU9yQ29sdW1uSW5kZXggPSBsaW5lSW5kZXg7XG5cbiAgICAgICAgICBpZiAoaGVpZ2h0ID4gY3VycmVudExpbmVIZWlnaHQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFN0b3JlIHRoZSBoaXRib3ggd2lkdGggYW5kIGhlaWdodCBoZXJlLiBGaW5hbCBwb3NpdGlvbiB3aWxsIGJlIHVwZGF0ZWQgaW4gYGRyYXdgXG4gICAgICAgICAgaGl0Ym94ZXNbaV0gPSB7XG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGxpbmVXaWR0aHNbbGluZVdpZHRocy5sZW5ndGggLSAxXSArPSB3aWR0aCArIGxhYmVsT3B0cy5wYWRkaW5nO1xuICAgICAgICB9KTtcblxuICAgICAgICBsaW5lSGVpZ2h0cy5wdXNoKGN1cnJlbnRMaW5lSGVpZ2h0KTtcbiAgICAgICAgbWluU2l6ZS5oZWlnaHQgKz0gbGluZUhlaWdodHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHYpIHtcbiAgICAgICAgICByZXR1cm4gYWNjICsgdjtcbiAgICAgICAgfSwgMCk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB2UGFkZGluZyA9IGxhYmVsT3B0cy5wYWRkaW5nO1xuICAgICAgICB2YXIgY29sdW1uV2lkdGhzID0gbWUuY29sdW1uV2lkdGhzID0gW107XG4gICAgICAgIHZhciBjb2x1bW5IZWlnaHRzID0gbWUuY29sdW1uSGVpZ2h0cyA9IFtdO1xuICAgICAgICB2YXIgdG90YWxXaWR0aCA9IGxhYmVsT3B0cy5wYWRkaW5nO1xuICAgICAgICB2YXIgY3VycmVudENvbFdpZHRoID0gMDtcbiAgICAgICAgdmFyIGN1cnJlbnRDb2xIZWlnaHQgPSAwO1xuICAgICAgICB2YXIgY29sdW1uSW5kZXggPSAwO1xuXG4gICAgICAgIGhlbHBlcnMuZWFjaChtZS5sZWdlbmRJdGVtcywgZnVuY3Rpb24gKGxlZ2VuZEl0ZW0sIGkpIHtcbiAgICAgICAgICB2YXIgaXRlbVdpZHRoO1xuICAgICAgICAgIHZhciBoZWlnaHQ7XG5cbiAgICAgICAgICBpZiAoaGVscGVycy5pc0FycmF5KGxlZ2VuZEl0ZW0udGV4dCkpIHtcbiAgICAgICAgICAgIGl0ZW1XaWR0aCA9IGdldE1heExpbmVXaWR0aChsZWdlbmRJdGVtLnRleHQpO1xuICAgICAgICAgICAgaGVpZ2h0ID0gZm9udFNpemUgKiBsZWdlbmRJdGVtLnRleHQubGVuZ3RoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtV2lkdGggPSBjdHgubWVhc3VyZVRleHQobGVnZW5kSXRlbS50ZXh0KS53aWR0aDtcbiAgICAgICAgICAgIGhlaWdodCA9IGZvbnRTaXplO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtV2lkdGggKz0gZ2V0Qm94V2lkdGgobGFiZWxPcHRzLCBmb250U2l6ZSkgKyAoZm9udFNpemUgLyAyKTtcblxuICAgICAgICAgIC8vIElmIHRvbyB0YWxsLCBnbyB0byBuZXcgY29sdW1uXG4gICAgICAgICAgaWYgKGN1cnJlbnRDb2xIZWlnaHQgKyBmb250U2l6ZSArIDIgKiB2UGFkZGluZyA+IG1pblNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0b3RhbFdpZHRoICs9IGN1cnJlbnRDb2xXaWR0aCArIGxhYmVsT3B0cy5wYWRkaW5nO1xuICAgICAgICAgICAgY29sdW1uV2lkdGhzLnB1c2goY3VycmVudENvbFdpZHRoKTsgLy8gcHJldmlvdXMgY29sdW1uIHdpZHRoXG4gICAgICAgICAgICBjb2x1bW5IZWlnaHRzLnB1c2goY3VycmVudENvbEhlaWdodCk7XG4gICAgICAgICAgICBjdXJyZW50Q29sV2lkdGggPSAwO1xuICAgICAgICAgICAgY3VycmVudENvbEhlaWdodCA9IDA7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCsrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxlZ2VuZEl0ZW0ubGluZU9yQ29sdW1uSW5kZXggPSBjb2x1bW5JbmRleDtcblxuICAgICAgICAgIC8vIEdldCBtYXggd2lkdGhcbiAgICAgICAgICBjdXJyZW50Q29sV2lkdGggPSBNYXRoLm1heChjdXJyZW50Q29sV2lkdGgsIGl0ZW1XaWR0aCk7XG4gICAgICAgICAgY3VycmVudENvbEhlaWdodCArPSBoZWlnaHQgKyB2UGFkZGluZztcblxuICAgICAgICAgIC8vIFN0b3JlIHRoZSBoaXRib3ggd2lkdGggYW5kIGhlaWdodCBoZXJlLiBGaW5hbCBwb3NpdGlvbiB3aWxsIGJlIHVwZGF0ZWQgaW4gYGRyYXdgXG4gICAgICAgICAgaGl0Ym94ZXNbaV0gPSB7XG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgd2lkdGg6IGl0ZW1XaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdG90YWxXaWR0aCArPSBjdXJyZW50Q29sV2lkdGg7XG4gICAgICAgIGNvbHVtbldpZHRocy5wdXNoKGN1cnJlbnRDb2xXaWR0aCk7XG4gICAgICAgIGNvbHVtbkhlaWdodHMucHVzaChjdXJyZW50Q29sSGVpZ2h0KTtcbiAgICAgICAgbWluU2l6ZS53aWR0aCArPSB0b3RhbFdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lLndpZHRoID0gbWluU2l6ZS53aWR0aDtcbiAgICBtZS5oZWlnaHQgPSBtaW5TaXplLmhlaWdodDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICB2YXIgb3B0cyA9IG1lLm9wdGlvbnM7XG4gICAgdmFyIGxhYmVsT3B0cyA9IG9wdHMubGFiZWxzO1xuICAgIHZhciBnbG9iYWxEZWZhdWx0cyA9IGRlZmF1bHRzLmdsb2JhbDtcbiAgICB2YXIgZGVmYXVsdENvbG9yID0gZ2xvYmFsRGVmYXVsdHMuZGVmYXVsdENvbG9yO1xuICAgIHZhciBsaW5lRGVmYXVsdCA9IGdsb2JhbERlZmF1bHRzLmVsZW1lbnRzLmxpbmU7XG4gICAgdmFyIGxlZ2VuZEhlaWdodCA9IG1lLmhlaWdodDtcbiAgICB2YXIgY29sdW1uSGVpZ2h0cyA9IG1lLmNvbHVtbkhlaWdodHM7XG4gICAgdmFyIGNvbHVtbldpZHRocyA9IG1lLmNvbHVtbldpZHRocztcbiAgICB2YXIgbGVnZW5kV2lkdGggPSBtZS53aWR0aDtcbiAgICB2YXIgbGluZVdpZHRocyA9IG1lLmxpbmVXaWR0aHM7XG4gICAgdmFyIGxpbmVIZWlnaHRzID0gbWUubGluZUhlaWdodHM7XG5cbiAgICBpZiAob3B0cy5kaXNwbGF5KSB7XG4gICAgICB2YXIgY3R4ID0gbWUuY3R4O1xuICAgICAgdmFyIGZvbnRDb2xvciA9IHZhbHVlT3JEZWZhdWx0KGxhYmVsT3B0cy5mb250Q29sb3IsIGdsb2JhbERlZmF1bHRzLmRlZmF1bHRGb250Q29sb3IpO1xuICAgICAgdmFyIGxhYmVsRm9udCA9IGhlbHBlcnMub3B0aW9ucy5fcGFyc2VGb250KGxhYmVsT3B0cyk7XG4gICAgICB2YXIgZm9udFNpemUgPSBsYWJlbEZvbnQuc2l6ZTtcbiAgICAgIHZhciBjdXJzb3I7XG5cbiAgICAgIC8vIENhbnZhcyBzZXR1cFxuICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAwLjU7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBmb250Q29sb3I7IC8vIGZvciBzdHJpa2V0aHJvdWdoIGVmZmVjdFxuICAgICAgY3R4LmZpbGxTdHlsZSA9IGZvbnRDb2xvcjsgLy8gcmVuZGVyIGluIGNvcnJlY3QgY29sb3VyXG4gICAgICBjdHguZm9udCA9IGxhYmVsRm9udC5zdHJpbmc7XG5cbiAgICAgIHZhciBib3hXaWR0aCA9IGdldEJveFdpZHRoKGxhYmVsT3B0cywgZm9udFNpemUpO1xuICAgICAgdmFyIGhpdGJveGVzID0gbWUubGVnZW5kSGl0Qm94ZXM7XG5cbiAgICAgIC8vIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIHZhciBkcmF3TGVnZW5kQm94ID0gZnVuY3Rpb24gKHgsIHksIGxlZ2VuZEl0ZW0pIHtcbiAgICAgICAgaWYgKGlzTmFOKGJveFdpZHRoKSB8fCBib3hXaWR0aCA8PSAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHRoZSBjdHggZm9yIHRoZSBib3hcbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICB2YXIgbGluZVdpZHRoID0gdmFsdWVPckRlZmF1bHQobGVnZW5kSXRlbS5saW5lV2lkdGgsIGxpbmVEZWZhdWx0LmJvcmRlcldpZHRoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHZhbHVlT3JEZWZhdWx0KGxlZ2VuZEl0ZW0uZmlsbFN0eWxlLCBkZWZhdWx0Q29sb3IpO1xuICAgICAgICBjdHgubGluZUNhcCA9IHZhbHVlT3JEZWZhdWx0KGxlZ2VuZEl0ZW0ubGluZUNhcCwgbGluZURlZmF1bHQuYm9yZGVyQ2FwU3R5bGUpO1xuICAgICAgICBjdHgubGluZURhc2hPZmZzZXQgPSB2YWx1ZU9yRGVmYXVsdChsZWdlbmRJdGVtLmxpbmVEYXNoT2Zmc2V0LCBsaW5lRGVmYXVsdC5ib3JkZXJEYXNoT2Zmc2V0KTtcbiAgICAgICAgY3R4LmxpbmVKb2luID0gdmFsdWVPckRlZmF1bHQobGVnZW5kSXRlbS5saW5lSm9pbiwgbGluZURlZmF1bHQuYm9yZGVySm9pblN0eWxlKTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdmFsdWVPckRlZmF1bHQobGVnZW5kSXRlbS5zdHJva2VTdHlsZSwgZGVmYXVsdENvbG9yKTtcblxuICAgICAgICBpZiAoY3R4LnNldExpbmVEYXNoKSB7XG4gICAgICAgICAgLy8gSUUgOSBhbmQgMTAgZG8gbm90IHN1cHBvcnQgbGluZSBkYXNoXG4gICAgICAgICAgY3R4LnNldExpbmVEYXNoKHZhbHVlT3JEZWZhdWx0KGxlZ2VuZEl0ZW0ubGluZURhc2gsIGxpbmVEZWZhdWx0LmJvcmRlckRhc2gpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzLmxhYmVscyAmJiBvcHRzLmxhYmVscy51c2VQb2ludFN0eWxlKSB7XG4gICAgICAgICAgLy8gUmVjYWxjdWxhdGUgeCBhbmQgeSBmb3IgZHJhd1BvaW50KCkgYmVjYXVzZSBpdHMgZXhwZWN0aW5nXG4gICAgICAgICAgLy8geCBhbmQgeSB0byBiZSBjZW50ZXIgb2YgZmlndXJlIChpbnN0ZWFkIG9mIHRvcCBsZWZ0KVxuICAgICAgICAgIHZhciByYWRpdXMgPSBib3hXaWR0aCAqIE1hdGguU1FSVDIgLyAyO1xuICAgICAgICAgIHZhciBjZW50ZXJYID0geCArIGJveFdpZHRoIC8gMjtcbiAgICAgICAgICB2YXIgY2VudGVyWSA9IHkgKyBmb250U2l6ZSAvIDI7XG5cbiAgICAgICAgICAvLyBEcmF3IHBvaW50U3R5bGUgYXMgbGVnZW5kIHN5bWJvbFxuICAgICAgICAgIGhlbHBlcnMuY2FudmFzLmRyYXdQb2ludChjdHgsIGxlZ2VuZEl0ZW0ucG9pbnRTdHlsZSwgcmFkaXVzLCBjZW50ZXJYLCBjZW50ZXJZKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBEcmF3IGJveCBhcyBsZWdlbmQgc3ltYm9sXG4gICAgICAgICAgaWYgKGxpbmVXaWR0aCAhPT0gMCkge1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgYm94V2lkdGgsIGZvbnRTaXplKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIGJveFdpZHRoLCBmb250U2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgfTtcblxuICAgICAgdmFyIGRyYXdTdHJpa2VUaHJvdWdoID0gZnVuY3Rpb24gKHgsIHksIHcpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBkcmF3Q3Jvc3NPdmVyID0gZnVuY3Rpb24gKHgsIHksIHcsIGgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIGgpO1xuICAgICAgICBjdHgubW92ZVRvKHgsIHkgKyBoKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBmaWxsVGV4dCA9IGZ1bmN0aW9uICh4LCB5LCBsZWdlbmRJdGVtLCB0ZXh0V2lkdGgpIHtcbiAgICAgICAgdmFyIGhhbGZGb250U2l6ZSA9IGZvbnRTaXplIC8gMjtcbiAgICAgICAgdmFyIHhMZWZ0ID0gYm94V2lkdGggKyBoYWxmRm9udFNpemUgKyB4O1xuICAgICAgICB2YXIgeU1pZGRsZSA9IHkgKyBoYWxmRm9udFNpemU7XG5cbiAgICAgICAgaWYgKGhlbHBlcnMuaXNBcnJheShsZWdlbmRJdGVtLnRleHQpKSB7XG4gICAgICAgICAgaGVscGVycy5lYWNoKGxlZ2VuZEl0ZW0udGV4dCwgZnVuY3Rpb24gKHRleHRMaW5lLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGxpbmVPZmZzZXQgPSBpbmRleCAqIGZvbnRTaXplO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHRMaW5lLCB4TGVmdCwgeU1pZGRsZSArIGxpbmVPZmZzZXQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN0eC5maWxsVGV4dChsZWdlbmRJdGVtLnRleHQsIHhMZWZ0LCB5TWlkZGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsZWdlbmRJdGVtLmhpZGRlbikge1xuICAgICAgICAgIGlmIChoZWxwZXJzLmlzQXJyYXkobGVnZW5kSXRlbS50ZXh0KSkge1xuICAgICAgICAgICAgZHJhd0Nyb3NzT3Zlcih4TGVmdCwgeU1pZGRsZSwgdGV4dFdpZHRoLCAobGVnZW5kSXRlbS50ZXh0Lmxlbmd0aCAtIDEpICogKGZvbnRTaXplIC0gMSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmF3U3RyaWtlVGhyb3VnaCh4TGVmdCwgeU1pZGRsZSwgdGV4dFdpZHRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHZhciBhbGlnbm1lbnRPZmZzZXQgPSBmdW5jdGlvbiAoZGltZW5zaW9uLCBibG9ja1NpemUpIHtcbiAgICAgICAgc3dpdGNoIChvcHRzLmFsaWduKSB7XG4gICAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsT3B0cy5wYWRkaW5nO1xuICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICByZXR1cm4gZGltZW5zaW9uIC0gYmxvY2tTaXplO1xuICAgICAgICAgIGRlZmF1bHQ6IC8vIGNlbnRlclxuICAgICAgICAgICAgcmV0dXJuIChkaW1lbnNpb24gLSBibG9ja1NpemUgKyBsYWJlbE9wdHMucGFkZGluZykgLyAyO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBIb3Jpem9udGFsXG4gICAgICB2YXIgaXNIb3Jpem9udGFsID0gbWUuaXNIb3Jpem9udGFsKCk7XG4gICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgIGN1cnNvciA9IHtcbiAgICAgICAgICB4OiBtZS5sZWZ0ICsgYWxpZ25tZW50T2Zmc2V0KGxlZ2VuZFdpZHRoLCBsaW5lV2lkdGhzWzBdKSxcbiAgICAgICAgICB5OiBtZS50b3AgKyBsYWJlbE9wdHMucGFkZGluZyxcbiAgICAgICAgICBsaW5lOiAwXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJzb3IgPSB7XG4gICAgICAgICAgeDogbWUubGVmdCArIGxhYmVsT3B0cy5wYWRkaW5nLFxuICAgICAgICAgIHk6IG1lLnRvcCArIGFsaWdubWVudE9mZnNldChsZWdlbmRIZWlnaHQsIGNvbHVtbkhlaWdodHNbMF0pLFxuICAgICAgICAgIGxpbmU6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaGVscGVycy5lYWNoKG1lLmxlZ2VuZEl0ZW1zLCBmdW5jdGlvbiAobGVnZW5kSXRlbSwgaSkge1xuICAgICAgICB2YXIgdGV4dFdpZHRoLCBoZWlnaHQsIGJveFRvcE9mZnNldDtcblxuICAgICAgICBpZiAobGVnZW5kSXRlbS5saW5lT3JDb2x1bW5JbmRleCA+IGN1cnNvci5saW5lKSB7XG4gICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgY3Vyc29yLnkgKz0gbGluZUhlaWdodHNbY3Vyc29yLmxpbmVdO1xuICAgICAgICAgICAgY3Vyc29yLmxpbmUgPSBsZWdlbmRJdGVtLmxpbmVPckNvbHVtbkluZGV4O1xuICAgICAgICAgICAgY3Vyc29yLnggPSBtZS5sZWZ0ICsgYWxpZ25tZW50T2Zmc2V0KGxlZ2VuZFdpZHRoLCBsaW5lV2lkdGhzW2N1cnNvci5saW5lXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnNvci54ICs9IGNvbHVtbldpZHRoc1tjdXJzb3IubGluZV0gKyBsYWJlbE9wdHMucGFkZGluZztcbiAgICAgICAgICAgIGN1cnNvci5saW5lID0gbGVnZW5kSXRlbS5saW5lT3JDb2x1bW5JbmRleDtcbiAgICAgICAgICAgIGN1cnNvci55ID0gbWUudG9wICsgYWxpZ25tZW50T2Zmc2V0KGxlZ2VuZEhlaWdodCwgY29sdW1uSGVpZ2h0c1tjdXJzb3IubGluZV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoZWxwZXJzLmlzQXJyYXkobGVnZW5kSXRlbS50ZXh0KSkge1xuICAgICAgICAgIHRleHRXaWR0aCA9IGxlZ2VuZEl0ZW0udGV4dC5tYXAoZnVuY3Rpb24gKHRleHRMaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gY3R4Lm1lYXN1cmVUZXh0KHRleHRMaW5lKS53aWR0aDtcbiAgICAgICAgICB9KS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgdikge1xuICAgICAgICAgICAgcmV0dXJuIHYgPiBhY2MgPyB2IDogYWNjO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIGJveFRvcE9mZnNldCA9IGZvbnRTaXplIC8gMiAqIChsZWdlbmRJdGVtLnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgaGVpZ2h0ID0gZm9udFNpemUgKiBsZWdlbmRJdGVtLnRleHQubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRleHRXaWR0aCA9IGN0eC5tZWFzdXJlVGV4dChsZWdlbmRJdGVtLnRleHQpLndpZHRoO1xuICAgICAgICAgIGJveFRvcE9mZnNldCA9IDA7XG4gICAgICAgICAgaGVpZ2h0ID0gZm9udFNpemU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd2lkdGggPSBib3hXaWR0aCArIChmb250U2l6ZSAvIDIpICsgdGV4dFdpZHRoO1xuICAgICAgICB2YXIgeCA9IGN1cnNvci54O1xuICAgICAgICB2YXIgeSA9IGN1cnNvci55O1xuXG4gICAgICAgIHZhciB0b3BPZmZzZXQgPSBpc0hvcml6b250YWwgPyBNYXRoLnRydW5jKChsaW5lSGVpZ2h0c1tjdXJzb3IubGluZV0gLSBoaXRib3hlc1tpXS5oZWlnaHQpIC8gMikgOiAwO1xuXG4gICAgICAgIGRyYXdMZWdlbmRCb3goeCwgeSArIGJveFRvcE9mZnNldCArIHRvcE9mZnNldCwgbGVnZW5kSXRlbSk7XG5cbiAgICAgICAgaGl0Ym94ZXNbaV0ubGVmdCA9IHg7XG4gICAgICAgIGhpdGJveGVzW2ldLnRvcCA9IHk7XG5cbiAgICAgICAgLy8gRmlsbCB0aGUgYWN0dWFsIGxhYmVsXG4gICAgICAgIGZpbGxUZXh0KHgsIHkgKyB0b3BPZmZzZXQsIGxlZ2VuZEl0ZW0sIHRleHRXaWR0aCk7XG5cbiAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgIGN1cnNvci54ICs9IHdpZHRoICsgbGFiZWxPcHRzLnBhZGRpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3Vyc29yLnkgKz0gaGVpZ2h0ICsgbGFiZWxPcHRzLnBhZGRpbmc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19