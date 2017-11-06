export const EXECUTION_REQUEST_POP = {
    afm: {
        attributes: [
            {
                localIdentifier: 'date_attr_local_identifier',
                displayForm: {
                    uri: '/gdc/md/project_id/obj/date_attr_df_uri_id'
                }
            }
        ],
        measures: [
            {
                localIdentifier: 'pop_measure_local_identifier',
                definition: {
                    popMeasure: {
                        measureIdentifier: 'measure_local_identifier',
                        popAttribute: {
                            uri: '/gdc/md/project_id/obj/date_attr_uri_id'
                        }
                    }
                },
                alias: 'Close [BOP] - Previous year'
            },
            {
                localIdentifier: 'measure_local_identifier',
                definition: {
                    measure: {
                        item: {
                            uri: '/gdc/md/project_id/obj/measure_uri_id'
                        }
                    }
                },
                alias: 'Close [BOP]'
            }
        ]
    },
    resultSpec: {
        dimensions: [
            {
                name: 'a',
                itemIdentifiers: ['date_attr_local_identifier']
            },
            {
                name: 'm',
                itemIdentifiers: ['measureGroup']
            }
        ]
    }
};

export const EXECUTION_RESPONSE_POP = {
    dimensions: [
        {
            name: 'a',
            headers: [
                {
                    attributeHeader: {
                        uri: '/gdc/md/project_id/obj/date_attr_df_uri_id',
                        identifier: 'date_attr_df_identifier',
                        localIdentifier: 'date_attr_local_identifier',
                        name: 'Year (Created)'
                    }
                }
            ]
        },
        {
            name: 'm',
            headers: [
                {
                    measureGroupHeader: {
                        items: [
                            {
                                measureHeaderItem: {
                                    uri: '/gdc/md/project_id/obj/pop_measure_uri_id',
                                    identifier: 'pop_measure_identifier',
                                    localIdentifier: 'pop_measure_local_identifier',
                                    name: 'Close [BOP] - Previous year',
                                    format: '$#,##0.00'
                                }
                            },
                            {
                                measureHeaderItem: {
                                    uri: '/gdc/md/project_id/obj/measure_uri_id',
                                    identifier: 'measure_identifier',
                                    localIdentifier: 'measure_local_identifier',
                                    name: 'Close [BOP]',
                                    format: '$#,##0.00'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ],
    links: {
        executionResult: '/gdc/app/projects/project_id/executionResults/foo?q=bar&c=baz&dimension=a&dimension=m'
    }
};

export const EXECUTION_RESULT_POP = {
    data: [
        [
            null,
            '41013',
            '40786',
            '40661'
        ],
        [
            '41013',
            '40786',
            '40661',
            null
        ]
    ],
    attributeHeaderItems: [
        [
            [
                {
                    attributeHeaderItem: {
                        name: '2008',
                        uri: '/gdc/md/project_id/obj/date_attr_df_uri_id/elements?id=2008'
                    }
                },
                {
                    attributeHeaderItem: {
                        name: '2009',
                        uri: '/gdc/md/project_id/obj/date_attr_df_uri_id/elements?id=2009'
                    }
                },
                {
                    attributeHeaderItem: {
                        name: '2010',
                        uri: '/gdc/md/project_id/obj/date_attr_df_uri_id/elements?id=2010'
                    }
                },
                {
                    attributeHeaderItem: {
                        name: '2011',
                        uri: '/gdc/md/project_id/obj/date_attr_df_uri_id/elements?id=2011'
                    }
                }
            ]
        ],
        [] // empty array => there are no attributes in second dimension
    ],
    paging: {
        size: [
            2,
            4
        ],
        offset: [
            0,
            0
        ],
        total: [
            2,
            4
        ]
    }
};

export const TABLE_HEADERS_POP = [
    {
        type: 'attribute',
        uri: '/gdc/md/project_id/obj/date_attr_df_uri_id',
        identifier: 'date_attr_df_identifier',
        localIdentifier: 'date_attr_local_identifier',
        name: 'Year (Created)'
    },
    {
        type: 'measure',
        uri: '/gdc/md/project_id/obj/pop_measure_uri_id',
        identifier: 'pop_measure_identifier',
        localIdentifier: 'pop_measure_local_identifier',
        name: 'Close [BOP] - Previous year',
        format: '$#,##0.00'
    },
    {
        type: 'measure',
        uri: '/gdc/md/project_id/obj/measure_uri_id',
        identifier: 'measure_identifier',
        localIdentifier: 'measure_local_identifier',
        name: 'Close [BOP]',
        format: '$#,##0.00'
    }
];

export const TABLE_ROWS_POP = [
    [
        {
            uri: '/gdc/md/project_id/obj/date_attr_df_uri_id/elements?id=2008',
            name: '2008'
        },
        null,
        '41013'
    ],
    [
        {
            uri: '/gdc/md/project_id/obj/date_attr_df_uri_id/elements?id=2009',
            name: '2009'
        },
        '41013',
        '40786'
    ],
    [
        {
            uri: '/gdc/md/project_id/obj/date_attr_df_uri_id/elements?id=2010',
            name: '2010'
        },
        '40786',
        '40661'
    ],
    [
        {
            uri: '/gdc/md/project_id/obj/date_attr_df_uri_id/elements?id=2011',
            name: '2011'
        },
        '40661',
        null
    ]
];
