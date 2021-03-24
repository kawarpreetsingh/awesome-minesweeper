import Cell from '../Cell/Cell';

import classes from './Board.module.css';

const board = ({boardData, leftClick, rightClick}) => {
    let boardCells = null;
    boardCells = boardData.map(boardRow => boardRow.map(boardCell => {
        const id = boardRow.length*boardCell.row + boardCell.column;
        return <Cell data={boardCell} key={id} id={id}/>;
    }));
    return (
        <div onClick={leftClick} onContextMenu={rightClick} className={classes.Board}>
            {boardCells}
        </div>
    );
}

export default board;