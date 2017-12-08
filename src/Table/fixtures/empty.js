export const EXECUTION_REQUEST_EMPTY = {
    afm: {
        measures: [
            {
                localIdentifier: 'd7cf56f6-bfb1-4d90-b629-8849ef75f6a5',
                definition: {
                    measure: {
                        item: {
                            uri: '/gdc/md/k790ohq1d8xcas9oipmwfs544tqkepku/obj/15420'
                        },
                        aggregation: 'sum'
                    }
                },
                alias: 'Sum of Orders'
            }
        ],
        filters: [
            {
                relativeDateFilter: {
                    dataSet: {
                        uri: '/gdc/md/k790ohq1d8xcas9oipmwfs544tqkepku/obj/15337'
                    },
                    granularity: 'GDC.time.year',
                    from: -1,
                    to: -1
                }
            }
        ]
    },
    resultSpec: {
        dimensions: [
            {
                itemIdentifiers: []
            },
            {
                itemIdentifiers: [
                    'measureGroup'
                ]
            }
        ]
    }
};

export const EXECUTION_RESPONSE_EMPTY = {
    dimensions: [
        {
            headers: []
        },
        {
            headers: [
                {
                    measureGroupHeader: {
                        items: [
                            {
                                measureHeaderItem: {
                                    name: 'Sum of Orders',
                                    format: '#,##0.00',
                                    localIdentifier: 'd7cf56f6-bfb1-4d90-b629-8849ef75f6a5'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ],
    links: {
        executionResult: '/gdc/app/projects/k790ohq1d8xcas9oipmwfs544tqkepku/executionResults/3073689280355958272?q=eAGVUsFygjAU%2FBXmecUCFQWd8dx6aQ%2B204PjAUnQVEIweak6Dv%2FeF6T1ggdvhGz27e7bC2heK41v%0AmeQwg88KBZacgQ%2B5Kq2svgTDnYHZau1DIUrk2h0ugJoT%2FkKoCnmF7b%2BfrLSOJNiyPJAs2CfTUO0O%0AEUtPeWamStTyWJhxHONhz%2Bu9DdTmO4jGo1FI42plBApVXUndaJhFsQ%2BlqIgzanzAc%2B3YM0QtNha5%0AR895jtD4%2FTI%2BXhfLO8STaQ8xCsk9meVatZR%2FbqI7HEmfuMrKDdfQUFp9hpJRz9zhXfgk6YHPSR3w%0AU625MW1esHo88LU391w%2Bw6gdrtXRrRUkp2zzF61sDWTBUDFu%2B%2Bha0GHXpKJQWmaEgK0Wt8p0uCvX%0AtS3%2FwIE%2FGIRPoVu4sVJm%2Bkyv6dC2jj6XVnqq8N41c0XzO0ELRlcPmUzDNH2OyVvzC2FT8X4%3D%0A&c=c064138f0ef6c6ce4efea3459a773fe1&offset=0%2C0&limit=1000%2C1000&dimensions=2&totals=0%2C0'
    }
};

export const EXECUTION_RESULT_EMPTY = {
    data: [],
    paging: {
        count: [
            0,
            0
        ],
        offset: [
            0,
            0
        ],
        total: [
            0,
            0
        ]
    }
};

export const TABLE_HEADERS_EMPTY = [
    {
        format: '#,##0.00',
        localIdentifier: 'd7cf56f6-bfb1-4d90-b629-8849ef75f6a5',
        name: 'Sum of Orders',
        type: 'measure'
    }
];

export const TABLE_ROWS_EMPTY = [];
