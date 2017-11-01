export interface IAfmTransformation {
    afmTransformation: {
        afm: IAfmObject;
        transformation?: ITransformation;
    }
}

export interface IAfmObject {
    attributes?: IAttribute[];
    measures?: IMeasure[];
    filters?: CompatibilityFilter[];
    nativeTotals?: ITotalItem[];
}

export interface ITransformation {
    measures?: IMeasureDescription[];
    dimensions?: IDimension[];
    totals?: ITotalItem[];
    sorts?: SortItem[];
}

// AFM objects
export interface IAttribute {
    localIdentifier?: Identifier;
    displayForm: ObjQualifier;
}

export interface IMeasure {
    localIdentifier?: Identifier;
    definition: MeasureDefinition;
    alias?: string;
}

export type MeasureDefinition = ISimpleMeasureDefinition | IPopMeasureDefinition;

export interface ISimpleMeasureDefinition {
    measure: ISimpleMeasure;
}

export interface IPopMeasureDefinition {
    popMeasure: IPopMeasure;
}

export interface ISimpleMeasure {
    item: ObjQualifier;
    aggregation?: MeasureAggregation;
    filters?: FilterItem[];
    showInPercent?: boolean;
}

export interface IPopMeasure {
    measureIdentifier: Identifier,
    popAttribute: ObjQualifier
};

export type MeasureAggregation = 'sum' | 'count' | 'avg' | 'min' | 'max' | 'median' | 'runsum';

// ObjQualifier type
export type Identifier = string;
export type ObjQualifier = IObjUriQualifier | IObjIdentifierQualifier;

export interface IObjIdentifierQualifier {
    identifier: string;
}

export interface IObjUriQualifier {
    uri: string;
}

// Filter types and interfaces
export type CompatibilityFilter = IExpressionFilter | FilterItem;
export type FilterItem = DateFilterItem | AttributeFilterItem;
export type AttributeFilterItem = IPositiveAttributeFilter | INegativeAttributeFilter;
export type DateFilterItem = IAbsoluteDateFilter | IRelativeDateFilter;

export interface IPositiveAttributeFilter {
    positiveAttributeFilter: {
        displayForm: ObjQualifier;
        in: string;
    };
}

export interface INegativeAttributeFilter {
    negativeAttributeFilter: {
        displayForm: ObjQualifier;
        notIn: string;
    };
}

export interface IAbsoluteDateFilter {
    absoluteDateFilter: {
        dataSet: ObjQualifier;
        from: string;
        to: string;
    };
}

export interface IRelativeDateFilter {
    relativeDateFilter: {
        dataSet: ObjQualifier;
        granularity: string;
        from: number;
        to: number;
    };
}

// Might be removed, as we don't know if expression filter is needed
export interface IExpressionFilter {
    value: string;
}

export interface ITotalItem {
    measureIdentifiler: Identifier;
    type: any; //TODO TotalType there is no definition of TotalType... should be clarified
    attributeIdentifiers: Identifier[];
}

// TRANSFORMATION definition
export interface IMeasureDescription {
    measureIdentifier: Identifier;
    alias?: string;
    format?: string;
}

export interface IDimension {
    identifier: Identifier;
    itemIdentifiers: Identifier[];
}

export type SortItem = IAttributeSortItem | IMeasureSortItem;
export type SortDirection = 'asc' | 'desc';

export interface IAttributeSortItem {
    attributeSortItem: {
        direction: SortDirection;
        attributeIdentifier: Identifier;
    };
}

export interface IMeasureSortItem {
    measureSortItem: {
        direction: SortDirection;
        locators: LocatorItem[];
    };
}

export type LocatorItem = IAttributeLocatorItem | IMeasureLocatorItem

export interface IAttributeLocatorItem {
    attributeLocatorItem: {
        attributeIdentifier: Identifier,
        element: string;
    };
}

export interface IMeasureLocatorItem {
    measureLocatorItem: {
        measureIdentifier: Identifier;
    }
}