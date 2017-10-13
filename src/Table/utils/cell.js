import cx from 'classnames';
import { colors2Object, numberFormat } from '@gooddata/numberjs';

import { ALIGN_LEFT, ALIGN_RIGHT } from '../constants/align';

export function getColumnAlign(header) {
    return (header.type === 'measure') ? ALIGN_RIGHT : ALIGN_LEFT;
}

export function getCellClassNames(rowIndex, columnKey, isDrillable) {
    return cx(
        {
            'gd-cell-drillable': isDrillable
        },
        `s-cell-${rowIndex}-${columnKey}`
    );
}

export function getStyledLabel(header, cellContent) {
    if (header.type !== 'measure') {
        return { style: {}, label: cellContent.name };
    }

    const formattedNumber = numberFormat(parseFloat(cellContent), header.format);
    const { label, color } = colors2Object(formattedNumber);
    const style = color ? { color } : {};

    return { style, label };
}
