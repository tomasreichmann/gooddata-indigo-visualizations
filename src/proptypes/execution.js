import PropTypes from 'prop-types';

const identifierPropTypes = PropTypes.string;

const objUriQualifierPropTypes = {
    identifier: PropTypes.string.isRequired
};

const objIdentifierQualifierPropTypes = {
    uri: PropTypes.string.isRequired
};

const objQualifierPropTypes = PropTypes.oneOfType([
    PropTypes.shape(objUriQualifierPropTypes),
    PropTypes.shape(objIdentifierQualifierPropTypes)
]);

const expressionFilterPropTypes = {
    value: PropTypes.string.isRequired
};

const absoluteDateFilterPropTypes = {
    absoluteDateFilter: PropTypes.shape({
        dataSet: objQualifierPropTypes.isRequired,
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    }).isRequired
};

const relativeDateFilterPropTypes = {
    relativeDateFilter: PropTypes.shape({
        dataSet: objQualifierPropTypes.isRequired,
        granularity: PropTypes.string.isRequired,
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired
    }).isRequired
};

const dateFilterItemPropTypes = PropTypes.oneOfType([
    PropTypes.shape(absoluteDateFilterPropTypes),
    PropTypes.shape(relativeDateFilterPropTypes)
]);

const positiveAttributeFilterPropTypes = {
    positiveAttributeFilter: PropTypes.shape({
        displayForm: objQualifierPropTypes.isRequired,
        in: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};

const negativeAttributeFilterPropTypes = {
    negativeAttributeFilter: PropTypes.shape({
        displayForm: objQualifierPropTypes.isRequired,
        notIn: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};

const attributeFilterItemPropTypes = PropTypes.oneOfType([
    PropTypes.shape(positiveAttributeFilterPropTypes),
    PropTypes.shape(negativeAttributeFilterPropTypes)
]);

const filterItemPropTypes = PropTypes.oneOfType([
    dateFilterItemPropTypes,
    attributeFilterItemPropTypes
]);

const compatibilityFilterPropTypes = PropTypes.oneOfType([
    PropTypes.shape(expressionFilterPropTypes),
    filterItemPropTypes
]);

const attributePropTypes = {
    localIdentifier: identifierPropTypes.isRequired,
    displayForm: objQualifierPropTypes.isRequired,
    alias: PropTypes.string
};

const simpleMeasurePropTypes = {
    item: objQualifierPropTypes.isRequired,
    aggregation: PropTypes.oneOf(['sum', 'count', 'avg', 'min', 'max', 'median', 'runsum']),
    filters: PropTypes.arrayOf(filterItemPropTypes),
    computeRatio: PropTypes.bool
};

const simpleMeasureDefinitionPropTypes = {
    measure: PropTypes.shape(simpleMeasurePropTypes).isRequired
};

const popMeasurePropTypes = {
    measureIdentifier: identifierPropTypes.isRequired,
    popAttribute: objQualifierPropTypes.isRequired
};

const popMeasureDefinitionPropTypes = {
    popMeasure: PropTypes.shape(popMeasurePropTypes).isRequired
};

const measurePropTypes = {
    localIdentifier: identifierPropTypes.isRequired,
    definition: PropTypes.oneOfType([
        PropTypes.shape(simpleMeasureDefinitionPropTypes),
        PropTypes.shape(popMeasureDefinitionPropTypes)
    ]).isRequired,
    alias: PropTypes.string,
    format: PropTypes.string
};

const nativeTotalItemPropTypes = {
    measureIdentifier: identifierPropTypes.isRequired,
    attributeIdentifiers: PropTypes.arrayOf(identifierPropTypes).isRequired
};

const afmPropTypes = {
    attributes: PropTypes.arrayOf(PropTypes.shape(attributePropTypes)),
    measures: PropTypes.arrayOf(PropTypes.shape(measurePropTypes)),
    filters: PropTypes.arrayOf(compatibilityFilterPropTypes),
    nativeTotals: PropTypes.arrayOf(PropTypes.shape(nativeTotalItemPropTypes))
};

const totalTypePropTypes = PropTypes.oneOf(['sum', 'avg', 'max', 'min', 'nat', 'med']);

const totalItemPropTypes = {
    measureIdentifier: identifierPropTypes.isRequired,
    type: totalTypePropTypes.isRequired,
    attributeIdentifier: identifierPropTypes.isRequired
};

const dimensionPropTypes = {
    itemIdentifiers: PropTypes.arrayOf(identifierPropTypes).isRequired,
    totals: PropTypes.arrayOf(PropTypes.shape(totalItemPropTypes))
};

const sortDirectionPropTypes = PropTypes.oneOf(['asc', 'desc']);

const attributeSortItemPropTypes = {
    attributeSortItem: PropTypes.shape({
        direction: sortDirectionPropTypes.isRequired,
        attributeIdentifier: identifierPropTypes.isRequired
    }).isRequired
};

const attributeLocatorItemPropTypes = {
    attributeLocatorItem: PropTypes.shape({
        attributeIdentifier: identifierPropTypes.isRequired,
        element: PropTypes.string.isRequired
    }).isRequired
};

const measureLocatorItemPropTypes = {
    measureLocatorItem: PropTypes.shape({
        measureIdentifier: identifierPropTypes.isRequired
    }).isRequired
};

const locatorItemPropTypes = PropTypes.oneOfType([
    PropTypes.shape(attributeLocatorItemPropTypes),
    PropTypes.shape(measureLocatorItemPropTypes)
]);

const measureSortItemPropTypes = {
    measureSortItem: PropTypes.shape({
        direction: sortDirectionPropTypes.isRequired,
        locators: PropTypes.arrayOf(locatorItemPropTypes).isRequired
    }).isRequired
};

const sortItemPropTypes = PropTypes.oneOfType([
    PropTypes.shape(attributeSortItemPropTypes),
    PropTypes.shape(measureSortItemPropTypes)
]);

const resultSpecPropTypes = {
    dimension: PropTypes.arrayOf(PropTypes.shape(dimensionPropTypes)),
    sorts: PropTypes.arrayOf(sortItemPropTypes)
};

const measureHeaderItemPropTypes = {
    measureHeaderItem: PropTypes.shape({
        uri: PropTypes.string,
        identifier: PropTypes.string,
        localIdentifier: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        format: PropTypes.string.isRequired
    }).isRequired
};

const totalHeaderItemPropTypes = {
    totalHeaderItem: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired
};

const measureGroupHeaderPropTypes = {
    measureGroupHeader: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape(measureHeaderItemPropTypes)).isRequired,
        totalItems: PropTypes.arrayOf(totalHeaderItemPropTypes)
    }).isRequired
};

const attributeHeaderPropTypes = {
    attributeHeader: PropTypes.shape({
        uri: PropTypes.string.isRequired,
        identifier: PropTypes.string.isRequired,
        localIdentifier: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        totalItems: PropTypes.arrayOf(PropTypes.shape(totalHeaderItemPropTypes))
    }).isRequired
};

const headerPropTypes = PropTypes.oneOfType([
    PropTypes.shape(measureGroupHeaderPropTypes),
    PropTypes.shape(attributeHeaderPropTypes)
]);

const resultDimensionPropTypes = {
    headers: PropTypes.arrayOf(headerPropTypes).isRequired
};

const attributeHeaderItemPropTypes = {
    attributeHeaderItem: PropTypes.shape({
        uri: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};

const dataValuePropTypes = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

export const ExecutionRequestPropTypes = PropTypes.shape({
    afm: PropTypes.shape(afmPropTypes).isRequired,
    resultSpec: PropTypes.shape(resultSpecPropTypes)
});

export const ExecutionResponsePropTypes = PropTypes.shape({
    links: PropTypes.shape({ executionResult: PropTypes.string.isRequired }).isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.shape(resultDimensionPropTypes)).isRequired
});

export const ExecutionResultPropTypes = PropTypes.shape({
    attributeHeaderItems: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.shape(attributeHeaderItemPropTypes)
            )
        )
    ),
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.arrayOf(dataValuePropTypes)),
        PropTypes.arrayOf(dataValuePropTypes)
    ]).isRequired,
    totals: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.arrayOf(
                dataValuePropTypes
            )
        )
    ),
    paging: PropTypes.shape({
        count: PropTypes.arrayOf(PropTypes.number).isRequired,
        offset: PropTypes.arrayOf(PropTypes.number).isRequired,
        total: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired
});
