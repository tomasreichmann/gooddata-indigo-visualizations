export const EXECUTION_REQUEST_1A = {
    afm: {
        attributes: [
            {
                localIdentifier: '1st_attr_local_identifier',
                displayForm: {
                    uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id'
                }
            }
        ]
    },
    resultSpec: {
        dimensions: [
            {
                itemIdentifiers: ['1st_attr_local_identifier']
            },
            {
                itemIdentifiers: []
            }
        ]
    }
};

export const EXECUTION_RESPONSE_1A = {
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
                }
            ]
        },
        {
            headers: []
        }
    ],
    links: {
        executionResult: '/gdc/app/projects/project_id/executionResults/foo?q=bar&c=baz&dimension=a&dimension=m'
    }
};

export const EXECUTION_RESULT_1A = {
    data: [],
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
                        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=12',
                        name: 'Television'
                    }
                }
            ]
        ],
        [] // empty array => there are no attributes in second dimension
    ],
    paging: {
        count: [
            0,
            2
        ],
        offset: [
            0,
            0
        ],
        total: [
            1,
            2
        ]
    }
};

export const TABLE_HEADERS_1A = [
    {
        type: 'attribute',
        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id',
        identifier: '1st_attr_df_identifier',
        localIdentifier: '1st_attr_local_identifier',
        name: 'Product'
    }
];

export const TABLE_ROWS_1A = [
    [
        {
            uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=3',
            name: 'Computer'
        }
    ],
    [
        {
            uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=12',
            name: 'Television'
        }
    ]
];
