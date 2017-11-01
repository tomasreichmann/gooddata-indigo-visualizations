/* eslint no-underscore-dangle: 0 */
import cloneDeep from 'lodash/cloneDeep';

export const DEFAULT_COLOR_PALETTE = [
    'rgb(20,178,226)',
    'rgb(0,193,141)',
    'rgb(229,77,66)',
    'rgb(241,134,0)',
    'rgb(171,85,163)',

    'rgb(244,213,33)',
    'rgb(148,161,174)',
    'rgb(107,191,216)',
    'rgb(181,136,177)',
    'rgb(238,135,128)',

    'rgb(241,171,84)',
    'rgb(133,209,188)',
    'rgb(41,117,170)',
    'rgb(4,140,103)',
    'rgb(181,60,51)',

    'rgb(163,101,46)',
    'rgb(140,57,132)',
    'rgb(136,219,244)',
    'rgb(189,234,222)',
    'rgb(239,197,194)'
];

function lighter(color, percent) {
    const t = percent < 0 ? 0 : 255;
    const p = Math.abs(percent);

    return Math.round((t - color) * p) + color;
}

function formatColor(red, green, blue) {
    return `rgb(${red},${green},${blue})`;
}

/**
 * Source:
 *     http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 */
export function _getLighterColor(color, percent) {
    const f = color.split(',');
    const R = parseInt(f[0].slice(4), 10);
    const G = parseInt(f[1], 10);
    const B = parseInt(f[2], 10);

    return formatColor(
        lighter(R, percent),
        lighter(G, percent),
        lighter(B, percent)
    );
}

export function getColorPalette(data, palette = DEFAULT_COLOR_PALETTE) {
    const newPalette = cloneDeep(palette);

    data.headers.filter(header => (header.type === 'metric'))
        .forEach((metric, idx) => {
            if (metric.id && metric.id.endsWith('_pop')) {
                const color = _getLighterColor(newPalette[idx % newPalette.length], 0.6);
                newPalette.splice(idx, 0, color);
            }
        });

    return newPalette;
}
