import React, {useState} from 'react';
import cn from 'classnames';
import './TableGrid.scss';
import { useEditorApi } from '../../TextEditor/context';
import {genKey, ContentBlock, ContentState, SelectionState, EditorState, Modifier} from 'draft-js';
import { Map, OrderedSet } from 'immutable';

const cells = Array(8).fill(1)
const grid = Array(8).fill([...cells])

interface TableGridProps {
    toggleOpen: () => void
}


const TableGrid: React.FC<TableGridProps> = ({toggleOpen}) => {
    const [size, setSize] = useState<{cols: number, rows: number}>({cols: 0, rows: 0})
    const {state, onChange} = useEditorApi()

    const handleHover = (i: number,j: number) => {
        setSize({cols: j + 1, rows: i + 1})
    }

    const insertTable = () => {

        let selection = state.getSelection();

        if (!selection.isCollapsed()) {
            return null;
        }

        if (state.getCurrentContent().getBlockForKey(selection.getAnchorKey()).getType() === 'table') {
            return null;
        }

        const defaultCellStyle = { border: '1px solid rgba(0, 0, 0, 0.2)', padding: '6px', 'text-align': 'center' };
        const cols = Array(size.cols).fill(1);
        const tableShape = Array(size.rows)
            .fill(cols)
            .map(row => row.map(() => ({element: 'td', style: {...defaultCellStyle}})))

        const tableKey = genKey()
        const newBlocks: ContentBlock[] = []
        tableShape.forEach((row, i) => {
            row.forEach((cell: any, j: number) => {
                let data = Map<string, {[key: string]: string} | {[key: string]: string}[]>({
                    tableKey,
                    tablePosition: `${tableKey}-${i}-${j}`,
                    'text-align': 'center'
                })
                if (i === 0 && j === 0) {
                    data = data
                        .set('tableShape', tableShape)
                        .set('tableStyle', {'border-collapse': 'collapse', margin: '15px 0', width: '100%'})
                        .set('rowStyle', [])
                }
                const newBlock = new ContentBlock({key: genKey(), type: 'table', text: '', data})
                newBlocks.push(newBlock);
            })
        })

        const selectionKey = selection.getAnchorKey();
        let contentState = state.getCurrentContent();
        contentState = Modifier.splitBlock(contentState, selection);
        const blockArray = contentState.getBlocksAsArray();
        const currBlock = contentState.getBlockForKey(selectionKey);
        const index = blockArray.findIndex(block => block === currBlock);
        const isEnd = index === blockArray.length - 1;
        if (blockArray[index]?.getType() === 'table') {
            newBlocks.unshift(new ContentBlock({ key: genKey() }));
        }
        if (blockArray[index + 1]?.getType() === 'table') {
            newBlocks.push(new ContentBlock({ key: genKey() }));
        }
        blockArray.splice(index + 1, 0, ...newBlocks);
        if (isEnd) {
            blockArray.push(new ContentBlock({ key: genKey() }));
        }
        const entityMap = contentState.getEntityMap();
        contentState = ContentState.createFromBlockArray(blockArray, entityMap);
        let newEditorState = EditorState.push(state, contentState, 'insert-fragment');
        const key = newBlocks[0].getKey();
        selection = SelectionState.createEmpty(key);
        newEditorState = EditorState.acceptSelection(newEditorState, selection);
        onChange(newEditorState);
        toggleOpen()
    }

    return (
        <div className="table-grid">
            {grid.map((row, i) => (
                <div key={i} className="table-grid_row">
                    {row.map((cell: number, j: number) => {
                        const isSelected = i <= size.rows - 1 && j <= size.cols -1
                        return (
                            <div
                                key={`${i}-${j}`}
                                className={cn("cell", {"cell-grey": !isSelected}, {"cell-blue": isSelected})}
                                onMouseEnter={() => handleHover(i, j)}
                                onClick={insertTable}
                            ></div>
                        )
                    })}
                </div>
            ))}
            <div className="table-info">
                Вставить таблицу: {size.cols} x {size.rows}
            </div>
        </div>
    );
};

export default TableGrid;