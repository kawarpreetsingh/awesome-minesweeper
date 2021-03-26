import Cell from '../Cell/Cell';

import classes from './Board.module.css';

const board = ({cells, leftClick, rightClick, level}) => {
    let boardCells = null;
    boardCells = cells.map(cellsRow => cellsRow.map(cell => {
        const id = cellsRow.length*cell.row + cell.column;
        return <Cell cell={cell} key={id} level={level}/>;
    }));
    return (
        <div onClick={leftClick} onContextMenu={rightClick} className={classes.Board}>
            {boardCells}
        </div>
    );
}

export default board;