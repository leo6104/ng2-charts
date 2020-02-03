/**
 * @fileoverview added by tsickle
 * Generated from: lib/get-colors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { defaultColors } from './default-colors';
/**
 * Generate colors by chart type
 * @param {?} chartType
 * @param {?} index
 * @param {?} count
 * @return {?}
 */
export function getColors(chartType, index, count) {
    if (chartType === 'pie' || chartType === 'doughnut') {
        return formatPieColors(generateColors(count));
    }
    if (chartType === 'polarArea') {
        return formatPolarAreaColors(generateColors(count));
    }
    if (chartType === 'line' || chartType === 'radar') {
        return formatLineColor(generateColor(index));
    }
    if (chartType === 'bar' || chartType === 'horizontalBar') {
        return formatBarColor(generateColor(index));
    }
    if (chartType === 'bubble') {
        return formatPieColors(generateColors(count));
    }
    if (chartType === 'scatter') {
        return formatPieColors(generateColors(count));
    }
    throw new Error(`getColors - Unsupported chart type ${chartType}`);
}
/**
 * @param {?} colour
 * @param {?} alpha
 * @return {?}
 */
function rgba(colour, alpha) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
}
/**
 * @param {?} min
 * @param {?} max
 * @return {?}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatLineColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.4),
        borderColor: rgba(colors, 1),
        pointBackgroundColor: rgba(colors, 1),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: rgba(colors, 0.8)
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatBarColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.6),
        borderColor: rgba(colors, 1),
        hoverBackgroundColor: rgba(colors, 0.8),
        hoverBorderColor: rgba(colors, 1)
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatPieColors(colors) {
    return {
        backgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        (color) => rgba(color, 0.6))),
        borderColor: colors.map((/**
         * @return {?}
         */
        () => '#fff')),
        pointBackgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        (color) => rgba(color, 1))),
        pointBorderColor: colors.map((/**
         * @return {?}
         */
        () => '#fff')),
        pointHoverBackgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        (color) => rgba(color, 1))),
        pointHoverBorderColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        (color) => rgba(color, 1)))
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatPolarAreaColors(colors) {
    return {
        backgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        (color) => rgba(color, 0.6))),
        borderColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        (color) => rgba(color, 1))),
        hoverBackgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        (color) => rgba(color, 0.8))),
        hoverBorderColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        (color) => rgba(color, 1)))
    };
}
/**
 * @return {?}
 */
function getRandomColor() {
    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}
/**
 * Generate colors for line|bar charts
 * @param {?} index
 * @return {?}
 */
function generateColor(index) {
    return defaultColors[index] || getRandomColor();
}
/**
 * Generate colors for pie|doughnut charts
 * @param {?} count
 * @return {?}
 */
function generateColors(count) {
    /** @type {?} */
    const colorsArr = new Array(count);
    for (let i = 0; i < count; i++) {
        colorsArr[i] = defaultColors[i] || getRandomColor();
    }
    return colorsArr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvbG9ycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvZ2V0LWNvbG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7QUFLakQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxTQUFpQixFQUFFLEtBQWEsRUFBRSxLQUFhO0lBQ3ZFLElBQUksU0FBUyxLQUFLLEtBQUssSUFBSSxTQUFTLEtBQUssVUFBVSxFQUFFO1FBQ25ELE9BQU8sZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsSUFBSSxTQUFTLEtBQUssV0FBVyxFQUFFO1FBQzdCLE9BQU8scUJBQXFCLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDckQ7SUFFRCxJQUFJLFNBQVMsS0FBSyxNQUFNLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtRQUNqRCxPQUFPLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUM5QztJQUVELElBQUksU0FBUyxLQUFLLEtBQUssSUFBSSxTQUFTLEtBQUssZUFBZSxFQUFFO1FBQ3hELE9BQU8sY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzdDO0lBRUQsSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQzFCLE9BQU8sZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQzNCLE9BQU8sZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUNyRSxDQUFDOzs7Ozs7QUFFRCxTQUFTLElBQUksQ0FB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QUFDLEtBQWUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBQztLQUNsRSxDQUFDO0FBQ0osQ0FBQzs7OztBQUVELFNBQVMsY0FBYztJQUNyQixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDOzs7Ozs7QUFLRCxTQUFTLGFBQWEsQ0FBQyxLQUFhO0lBQ2xDLE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBQ2xELENBQUM7Ozs7OztBQUtELFNBQVMsY0FBYyxDQUFDLEtBQWE7O1VBQzdCLFNBQVMsR0FBb0IsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ25ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDOUIsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQztLQUNyRDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xvciB9IGZyb20gJy4vY29sb3InO1xuaW1wb3J0IHsgQ29sb3JzIH0gZnJvbSAnLi9jb2xvcnMnO1xuaW1wb3J0IHsgZGVmYXVsdENvbG9ycyB9IGZyb20gJy4vZGVmYXVsdC1jb2xvcnMnO1xuXG4vKipcbiAqIEdlbmVyYXRlIGNvbG9ycyBieSBjaGFydCB0eXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xvcnMoY2hhcnRUeXBlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiBDb2xvciB7XG4gIGlmIChjaGFydFR5cGUgPT09ICdwaWUnIHx8IGNoYXJ0VHlwZSA9PT0gJ2RvdWdobnV0Jykge1xuICAgIHJldHVybiBmb3JtYXRQaWVDb2xvcnMoZ2VuZXJhdGVDb2xvcnMoY291bnQpKTtcbiAgfVxuXG4gIGlmIChjaGFydFR5cGUgPT09ICdwb2xhckFyZWEnKSB7XG4gICAgcmV0dXJuIGZvcm1hdFBvbGFyQXJlYUNvbG9ycyhnZW5lcmF0ZUNvbG9ycyhjb3VudCkpO1xuICB9XG5cbiAgaWYgKGNoYXJ0VHlwZSA9PT0gJ2xpbmUnIHx8IGNoYXJ0VHlwZSA9PT0gJ3JhZGFyJykge1xuICAgIHJldHVybiBmb3JtYXRMaW5lQ29sb3IoZ2VuZXJhdGVDb2xvcihpbmRleCkpO1xuICB9XG5cbiAgaWYgKGNoYXJ0VHlwZSA9PT0gJ2JhcicgfHwgY2hhcnRUeXBlID09PSAnaG9yaXpvbnRhbEJhcicpIHtcbiAgICByZXR1cm4gZm9ybWF0QmFyQ29sb3IoZ2VuZXJhdGVDb2xvcihpbmRleCkpO1xuICB9XG5cbiAgaWYgKGNoYXJ0VHlwZSA9PT0gJ2J1YmJsZScpIHtcbiAgICByZXR1cm4gZm9ybWF0UGllQ29sb3JzKGdlbmVyYXRlQ29sb3JzKGNvdW50KSk7XG4gIH1cblxuICBpZiAoY2hhcnRUeXBlID09PSAnc2NhdHRlcicpIHtcbiAgICByZXR1cm4gZm9ybWF0UGllQ29sb3JzKGdlbmVyYXRlQ29sb3JzKGNvdW50KSk7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoYGdldENvbG9ycyAtIFVuc3VwcG9ydGVkIGNoYXJ0IHR5cGUgJHtjaGFydFR5cGV9YCk7XG59XG5cbmZ1bmN0aW9uIHJnYmEoY29sb3VyOiBBcnJheTxudW1iZXI+LCBhbHBoYTogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuICdyZ2JhKCcgKyBjb2xvdXIuY29uY2F0KGFscGhhKS5qb2luKCcsJykgKyAnKSc7XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cblxuZnVuY3Rpb24gZm9ybWF0TGluZUNvbG9yKGNvbG9yczogQXJyYXk8bnVtYmVyPik6IENvbG9yIHtcbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHJnYmEoY29sb3JzLCAwLjQpLFxuICAgIGJvcmRlckNvbG9yOiByZ2JhKGNvbG9ycywgMSksXG4gICAgcG9pbnRCYWNrZ3JvdW5kQ29sb3I6IHJnYmEoY29sb3JzLCAxKSxcbiAgICBwb2ludEJvcmRlckNvbG9yOiAnI2ZmZicsXG4gICAgcG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgIHBvaW50SG92ZXJCb3JkZXJDb2xvcjogcmdiYShjb2xvcnMsIDAuOClcbiAgfTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0QmFyQ29sb3IoY29sb3JzOiBBcnJheTxudW1iZXI+KTogQ29sb3Ige1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmRDb2xvcjogcmdiYShjb2xvcnMsIDAuNiksXG4gICAgYm9yZGVyQ29sb3I6IHJnYmEoY29sb3JzLCAxKSxcbiAgICBob3ZlckJhY2tncm91bmRDb2xvcjogcmdiYShjb2xvcnMsIDAuOCksXG4gICAgaG92ZXJCb3JkZXJDb2xvcjogcmdiYShjb2xvcnMsIDEpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFBpZUNvbG9ycyhjb2xvcnM6IEFycmF5PG51bWJlcltdPik6IENvbG9ycyB7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcnMubWFwKChjb2xvcjogbnVtYmVyW10pID0+IHJnYmEoY29sb3IsIDAuNikpLFxuICAgIGJvcmRlckNvbG9yOiBjb2xvcnMubWFwKCgpID0+ICcjZmZmJyksXG4gICAgcG9pbnRCYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycy5tYXAoKGNvbG9yOiBudW1iZXJbXSkgPT4gcmdiYShjb2xvciwgMSkpLFxuICAgIHBvaW50Qm9yZGVyQ29sb3I6IGNvbG9ycy5tYXAoKCkgPT4gJyNmZmYnKSxcbiAgICBwb2ludEhvdmVyQmFja2dyb3VuZENvbG9yOiBjb2xvcnMubWFwKChjb2xvcjogbnVtYmVyW10pID0+IHJnYmEoY29sb3IsIDEpKSxcbiAgICBwb2ludEhvdmVyQm9yZGVyQ29sb3I6IGNvbG9ycy5tYXAoKGNvbG9yOiBudW1iZXJbXSkgPT4gcmdiYShjb2xvciwgMSkpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFBvbGFyQXJlYUNvbG9ycyhjb2xvcnM6IEFycmF5PG51bWJlcltdPik6IENvbG9yIHtcbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycy5tYXAoKGNvbG9yOiBudW1iZXJbXSkgPT4gcmdiYShjb2xvciwgMC42KSksXG4gICAgYm9yZGVyQ29sb3I6IGNvbG9ycy5tYXAoKGNvbG9yOiBudW1iZXJbXSkgPT4gcmdiYShjb2xvciwgMSkpLFxuICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBjb2xvcnMubWFwKChjb2xvcjogbnVtYmVyW10pID0+IHJnYmEoY29sb3IsIDAuOCkpLFxuICAgIGhvdmVyQm9yZGVyQ29sb3I6IGNvbG9ycy5tYXAoKGNvbG9yOiBudW1iZXJbXSkgPT4gcmdiYShjb2xvciwgMSkpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9yKCk6IG51bWJlcltdIHtcbiAgcmV0dXJuIFtnZXRSYW5kb21JbnQoMCwgMjU1KSwgZ2V0UmFuZG9tSW50KDAsIDI1NSksIGdldFJhbmRvbUludCgwLCAyNTUpXTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBjb2xvcnMgZm9yIGxpbmV8YmFyIGNoYXJ0c1xuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbG9yKGluZGV4OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gIHJldHVybiBkZWZhdWx0Q29sb3JzW2luZGV4XSB8fCBnZXRSYW5kb21Db2xvcigpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGNvbG9ycyBmb3IgcGllfGRvdWdobnV0IGNoYXJ0c1xuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbG9ycyhjb3VudDogbnVtYmVyKTogQXJyYXk8bnVtYmVyW10+IHtcbiAgY29uc3QgY29sb3JzQXJyOiBBcnJheTxudW1iZXJbXT4gPSBuZXcgQXJyYXkoY291bnQpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICBjb2xvcnNBcnJbaV0gPSBkZWZhdWx0Q29sb3JzW2ldIHx8IGdldFJhbmRvbUNvbG9yKCk7XG4gIH1cbiAgcmV0dXJuIGNvbG9yc0Fycjtcbn1cbiJdfQ==