import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { range } from 'lodash';

import TableTransformation from '../src/Table/TableTransformation';
import ResponsiveTable from '../src/Table/ResponsiveTable';
import IntlWrapper from './utils/IntlWrapper';
import { screenshotWrap } from './utils/wrap';
import { EXECUTION_REQUEST, EXECUTION_RESPONSE, EXECUTION_RESULT } from './test_data/table';
import '../src/styles/table.scss';

function generateExecutionRequest() { // TODO generate correct execution request
    // no needed exact executionRequest for these storybook usages
    return {
        afm: {},
        resultSpec: {}
    };
}

function generateAttributeDisplayFormUriForColumn(rowNumber) {
    return `/gdc/md/project_id/obj/attr_${rowNumber}_df_uri_id`;
}

function generateAttributeHeaders(columns) {
    return range(columns).map((columnNumber) => {
        return {
            attributeHeader: {
                uri: generateAttributeDisplayFormUriForColumn(columnNumber),
                identifier: `identifier_${columnNumber}`,
                localIdentifier: `local_identifier_${columnNumber}`,
                name: `Column ${columnNumber}`
            }
        };
    });
}

function generateAttributeHeaderItems(columns, rows) {
    return [
        range(columns).map((columnNumber) => {
            return range(rows).map((rowNumber) => {
                return {
                    attributeHeaderItem: {
                        uri: `${generateAttributeDisplayFormUriForColumn(columnNumber)}/elements?id=${rowNumber}`,
                        name: columnNumber
                    }
                };
            });
        }),
        [] // empty array => there are no attributes in second dimension
    ];
}

function generateExecutionResponse(columns, rows) {
    return {
        dimensions: [
            {
                name: 'a',
                headers: generateAttributeHeaders(columns, rows)
            },
            {
                name: 'm',
                headers: []
            }
        ],
        links: {
            dataResult: '/gdc/app/projects/project_id/executionResults/foo?q=bar&c=baz&dimension=a&dimension=m'
        }
    };
}

function generateExecutionResult(columns, rows) {
    return {
        data: [],
        attributeHeaderItems: generateAttributeHeaderItems(columns, rows),
        paging: {
            size: [
                0,
                20
            ],
            offset: [
                0,
                0
            ],
            overallSize: [
                1,
                20
            ]
        }
    };
}

storiesOf('Table')
    .add('Fixed dimensions', () => (
        screenshotWrap(
            <div>
                <TableTransformation
                    executionRequest={EXECUTION_REQUEST}
                    executionResponse={EXECUTION_RESPONSE}
                    executionResult={EXECUTION_RESULT}
                    height={400}
                    onSortChange={action('Sort changed')}
                    width={600}
                />
            </div>
        )
    ))
    .add('Fill parent', () => (
        screenshotWrap(
            <div style={{ width: '100%', height: 500 }}>
                <TableTransformation
                    executionRequest={EXECUTION_REQUEST}
                    executionResponse={EXECUTION_RESPONSE}
                    executionResult={EXECUTION_RESULT}
                    onSortChange={action('Sort changed')}
                />
            </div>
        )
    ))
    .add('Sticky header', () => (
        screenshotWrap(
            <div style={{ width: '100%', height: 600 }}>
                <TableTransformation
                    config={{
                        stickyHeader: 0
                    }}
                    executionRequest={EXECUTION_REQUEST}
                    executionResponse={EXECUTION_RESPONSE}
                    executionResult={EXECUTION_RESULT}
                    height={400}
                    onSortChange={action('Sort changed')}
                />
                <div style={{ height: 800 }} />
            </div>
        )
    ))
    .add('Vertical scroll', () => (
        screenshotWrap(
            <div>
                <TableTransformation
                    executionRequest={generateExecutionRequest()}
                    executionResponse={generateExecutionResponse(20, 20)}
                    executionResult={generateExecutionResult(20, 20)}
                    height={400}
                    onSortChange={action('Sort changed')}
                    width={600}
                />
            </div>
        )
    ))
    .add('Show more/Show less', () => (
        screenshotWrap(
            <IntlWrapper>
                <TableTransformation
                    config={{
                        onMore: action('More clicked'),
                        onLess: action('Less clicked')
                    }}
                    executionRequest={generateExecutionRequest()}
                    executionResponse={generateExecutionResponse(20, 20)}
                    executionResult={generateExecutionResult(20, 20)}
                    height={400}
                    onSortChange={action('Sort changed')}
                    tableRenderer={props => (<ResponsiveTable {...props} rowsPerPage={10} />)}
                />
            </IntlWrapper>
        )
    ));
