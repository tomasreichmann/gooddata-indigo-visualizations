import { assign, get, zip } from 'lodash';

function getAttributeAndMeasureResponseDimensions(executionResponse) {
    const dimensions = get(executionResponse, 'dimensions', []);

    // two dimensions must be always returned (and requested)
    if (dimensions.length !== 2) {
        throw new Error('Number of dimensions must be equal two');
    }

    // attributes are always returned (and requested) in first dimension
    const attributeResponseDimension = dimensions[0];

    // measures are always returned (and requested) in second dimension
    const measureResponseDimension = dimensions[1];

    return { attributeResponseDimension, measureResponseDimension };
}

function getAttributeHeaders(attributeDimension) {
    // TODO check if each header contains uri, identifier, localIdentifier, name
    return get(attributeDimension, 'headers', [])
        .map(
            attributeHeader => assign(
                get(attributeHeader, 'attributeHeader'),
                { type: 'attribute' }
            )
        );
}

function getMeasureHeaders(measureDimension) {
    const measureDimensionHeaders = get(measureDimension, 'headers');

    if (!measureDimensionHeaders) {
        return [];
    }

    // TODO check if each header contains uri, identifier, localIdentifier, name, format
    return get(measureDimensionHeaders[0], ['measureGroupHeader', 'items'], [])
        .map(
            measureHeader => assign(
                get(measureHeader, 'measureHeaderItem'),
                { type: 'measure' }
            )
        );
}

export function getHeaders(executionResponse) {
    const {
        attributeResponseDimension,
        measureResponseDimension
    } = getAttributeAndMeasureResponseDimensions(executionResponse);

    const attributeHeaders = getAttributeHeaders(attributeResponseDimension);
    const measureHeaders = getMeasureHeaders(measureResponseDimension);

    return [...attributeHeaders, ...measureHeaders];
}

export function getRows(executionResult) {
    // two dimensional attributeHeaderItems array are always returned (and requested)
    // attributes are always returned (and requested) in first dimension
    const attributeValues = get(executionResult, 'attributeHeaderItems')[0]
        .map(
            attributeHeaderItem => attributeHeaderItem
                .map(
                    attrHeaderItem => get(attrHeaderItem, 'attributeHeaderItem')
                )
        );

    const measureValues = get(executionResult, 'data');

    return zip(...attributeValues, ...measureValues);
}
