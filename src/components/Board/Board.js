import Cell from '../Cell/Cell';

import classes from './Board.module.css';

// The board or block of cells
const Board = ({ cells, leftClick, rightClick, level }) => {
    let boardCells = null;
    boardCells = cells.map(cellsRow =>
        cellsRow.map(cell => {
            const id = cellsRow.length * cell.row + cell.column;
            return <Cell cell={cell} key={id} level={level} />;
        })
    );
    return (
        <div 
            onClick={leftClick} // Left click on the board
            onContextMenu={rightClick} // Right click on the board
            className={classes.Board}
        > 
            {boardCells} 
        </div>
    );
}

export default Board;