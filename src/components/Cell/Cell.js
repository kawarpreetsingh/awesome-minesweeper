import Card from '../UI/Card/Card';

import classes from './Cell.module.css';

// The individual cell in the board
const Cell = ({ cell, level }) => {
    let cellData = null;
    const classArray = [classes.Cell];
    classArray.push(classes[level.name]);
    if (cell.revealed) {
        classArray.push(classes.Revealed);
        if (cell.hasMine) {
            cellData = "💣";
        }
        else if (cell.neighbours !== 0) {
            cellData = cell.neighbours;
        }
    }
    else {
        cellData = cell.flagged ? "🚩" : null;
    }

    return (
        <Card>
            <div 
                data-row={cell.row} // Data sets used to achieve event delegation
                data-column={cell.column}
                className={classArray.join(' ')}
            >
                {cellData}
            </div>
        </Card>
    );
}

export default Cell;