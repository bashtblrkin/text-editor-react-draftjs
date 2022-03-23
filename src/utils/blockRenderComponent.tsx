import * as React from 'react';
import {ContentBlock, Editor, EditorBlock} from 'draft-js';
import {createPortal} from 'react-dom';
import {Map} from 'immutable';
import {camelCase} from 'lodash';

interface TableProps {
    block: ContentBlock
    blockProps: {
        editor: Editor | null
    }
}

export const Table: React.FC<TableProps> = (props) => {

    const {
        block,
        blockProps: {editor}
    } = props

    // if this is not the first table block, then we target the <td> element in the applicable position
    // to render the current block into.
    if (block.getData().get('tablePosition') && !block.getData().get('tableShape')) {
        const position = block.getData().get('tablePosition');
        const target = editor?.editor?.querySelector(`[data-position='${position}']`);
        if (target) {
            return createPortal(<EditorBlock {...props} />, target);
        }
        /**
         * If we get here then the target wasn't in the DOM yet. The reset and paste/insert-related
         * functions use blur() and focus() to trigger a rerender, at which time the DOM will have been
         * updated with the framework of the table structure.
         */
        console.log('return null')
        return null;
    }
    // If we get here we know we are rendering the first block of the table and will render the whole DOM structure of the table
    const data = block.getData();
    const tableKey = data.get('tableKey');
    const tableStyle = Map(data.get('tableStyle'))
        .mapKeys((k) => {
            if (typeof k === 'string') {
                return camelCase(k)
            }
        })
        .toJS();
    const tableShape = data.get('tableShape');
    const colgroup = data.get('tableColgroup');

    if (Array.isArray(tableShape)) {
        return (
            <table key={tableKey} style={tableStyle} id={tableKey}>
                {colgroup && <colgroup dangerouslySetInnerHTML={{__html: colgroup}}></colgroup>}
                <tbody>
                {tableShape.map((row, i) => (
                    <tr
                        key={i}
                        style={
                            data.get('rowStyle')[i] &&
                            Map(data.get('rowStyle')[i])
                                .mapKeys((k) => {
                                    if (typeof k === 'string') {
                                        return camelCase(k)
                                    }
                                })
                                .toJS()
                        }
                    >
                        {row.map((cell: any, j: number) => {
                            const cellStyle = Map(cell.style)
                                .mapKeys((k) => {
                                    if (typeof k === 'string') {
                                        return camelCase(k)
                                    }
                                })
                                .toJS();
                            if (cell.element === 'th') {
                                return (
                                    <th
                                        key={j}
                                        style={cellStyle}
                                        colSpan={cell.colspan}
                                        rowSpan={cell.rowspan}
                                        data-position={`${tableKey}-${i}-${j}`}
                                    >
                                        {!!((i === 0) && (j === 0)) && <EditorBlock {...props} />}
                                    </th>
                                );
                            }
                            return (
                                <td
                                    key={j}
                                    style={cellStyle}
                                    colSpan={cell.colspan}
                                    rowSpan={cell.rowspan}
                                    data-position={`${tableKey}-${i}-${j}`}
                                >
                                    {!!((i === 0) && (j === 0)) && <EditorBlock {...props} />}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    } else {
        return <EditorBlock {...props} />;
    }
};