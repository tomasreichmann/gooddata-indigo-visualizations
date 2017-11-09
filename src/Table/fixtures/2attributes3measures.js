export const EXECUTION_REQUEST_2A_3M = {
    afm: {
        attributes: [
            {
                localIdentifier: '1st_attr_local_identifier',
                displayForm: {
                    uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id'
                }
            },
            {
                localIdentifier: '2nd_attr_local_identifier',
                displayForm: {
                    identifier: '2nd_attr_df_identifier'
                }
            }
        ],
        measures: [
            {
                localIdentifier: '1st_measure_local_identifier',
                definition: {
                    measure: {
                        item: {
                            uri: '/gdc/md/project_id/obj/1st_measure_uri_id'
                        }
                    }
                }
            },
            {
                localIdentifier: '2nd_measure_local_identifier',
                definition: {
                    measure: {
                        item: {
                            identifier: '2nd_measure_identifier'
                        }
                    }
                }
            },
            {
                localIdentifier: '3rd_measure_local_identifier',
                definition: {
                    measure: {
                        item: {
                            uri: '/gdc/md/project_id/obj/3rd_measure_uri_id'
                        }
                    }
                }
            }
        ]
    },
    resultSpec: {
        dimensions: [
            {
                itemIdentifiers: ['1st_attr_local_identifier', '2nd_attr_local_identifier']
            },
            {
                itemIdentifiers: ['measureGroup']
            }
        ]
    }
};

export const EXECUTION_RESPONSE_2A_3M = {
    dimensions: [
        {
            headers: [
                {
                    attributeHeader: {
                        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id',
                        identifier: '1st_attr_df_identifier',
                        localIdentifier: '1st_attr_local_identifier',
                        name: 'Product'
                    }
                },
                {
                    attributeHeader: {
                        uri: '/gdc/md/project_id/obj/2nd_attr_df_uri_id',
                        identifier: '2nd_attr_df_identifier',
                        localIdentifier: '2nd_attr_local_identifier',
                        name: 'Region'
                    }
                }
            ]
        },
        {
            headers: [
                {
                    measureGroupHeader: {
                        items: [
                            {
                                measureHeaderItem: {
                                    uri: '/gdc/md/project_id/obj/1st_measure_uri_id',
                                    identifier: '1st_measure_identifier',
                                    localIdentifier: '1st_measure_local_identifier',
                                    name: 'Lost',
                                    format: '$#,##0.00'
                                }
                            },
                            {
                                measureHeaderItem: {
                                    uri: '/gdc/md/project_id/obj/2nd_measure_uri_id',
                                    identifier: '2nd_measure_identifier',
                                    localIdentifier: '2nd_measure_local_identifier',
                                    name: 'Won',
                                    format: '[red]$#,##0.00'
                                }
                            },
                            {
                                measureHeaderItem: {
                                    uri: '/gdc/md/project_id/obj/3rd_measure_uri_id',
                                    identifier: '3rd_measure_identifier',
                                    localIdentifier: '3rd_measure_local_identifier',
                                    name: 'Expected',
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

export const EXECUTION_RESULT_2A_3M = {
    data: [
        [
            '1953605.55',
            '10711626.9',
            '2167802.76',
            '7557512.72'
        ],
        [
            '2115472',
            '7122497.87',
            '2307461.24',
            '6550145.82'

        ],
        [
            '285287.96',
            '1146695.28',
            '767583.753',
            '700102.675'

        ]
    ],
    headerItems: [
        [
            [
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=3',
                        name: 'Computer'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=3',
                        name: 'Computer'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=12',
                        name: 'Television'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=12',
                        name: 'Television'
                    }
                }
            ],
            [
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/project_id/obj/2nd_attr_df_uri_id/elements?id=71',
                        name: 'East Coast'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/project_id/obj/2nd_attr_df_uri_id/elements?id=67',
                        name: 'West Coast'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/project_id/obj/2nd_attr_df_uri_id/elements?id=71',
                        name: 'East Coast'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/project_id/obj/2nd_attr_df_uri_id/elements?id=67',
                        name: 'West Coast'
                    }
                }
            ]
        ],
        [] // empty array => there are no attributes in second dimension
    ],
    paging: {
        count: [
            3,
            4
        ],
        offset: [
            0,
            0
        ],
        total: [
            3,
            4
        ]
    }
};

export const TABLE_HEADERS_2A_3M = [
    {
        type: 'attribute',
        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id',
        identifier: '1st_attr_df_identifier',
        localIdentifier: '1st_attr_local_identifier',
        name: 'Product'
    },
    {
        type: 'attribute',
        uri: '/gdc/md/project_id/obj/2nd_attr_df_uri_id',
        identifier: '2nd_attr_df_identifier',
        localIdentifier: '2nd_attr_local_identifier',
        name: 'Region'
    },
    {
        type: 'measure',
        uri: '/gdc/md/project_id/obj/1st_measure_uri_id',
        identifier: '1st_measure_identifier',
        localIdentifier: '1st_measure_local_identifier',
        name: 'Lost',
        format: '$#,##0.00'
    },
    {
        type: 'measure',
        uri: '/gdc/md/project_id/obj/2nd_measure_uri_id',
        identifier: '2nd_measure_identifier',
        localIdentifier: '2nd_measure_local_identifier',
        name: 'Won',
        format: '[red]$#,##0.00'
    },
    {
        type: 'measure',
        uri: '/gdc/md/project_id/obj/3rd_measure_uri_id',
        identifier: '3rd_measure_identifier',
        localIdentifier: '3rd_measure_local_identifier',
        name: 'Expected',
        format: '$#,##0.00'
    }
];

export const TABLE_ROWS_2A_3M = [
    [
        {
            uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=3',
            name: 'Computer'
        },
        {
            uri: '/gdc/md/project_id/obj/2nd_attr_df_uri_id/elements?id=71',
            name: 'East Coast'
        },
        '1953605.55',
        '2115472',
        '285287.96'
    ],
    [
        {
            uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=3',
            name: 'Computer'
        },
        {
            uri: '/gdc/md/project_id/obj/2nd_attr_df_uri_id/elements?id=67',
            name: 'West Coast'
        },
        '10711626.9',
        '7122497.87',
        '1146695.28'
    ],
    [
        {
            uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=12',
            name: 'Television'
        },
        {
            uri: '/gdc/md/project_id/obj/2nd_attr_df_uri_id/elements?id=71',
            name: 'East Coast'
        },
        '2167802.76',
        '2307461.24',
        '767583.753'
    ],
    [
        {
            uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=12',
            name: 'Television'
        },
        {
            uri: '/gdc/md/project_id/obj/2nd_attr_df_uri_id/elements?id=67',
            name: 'West Coast'
        },
        '7557512.72',
        '6550145.82',
        '700102.675'
    ]
];
