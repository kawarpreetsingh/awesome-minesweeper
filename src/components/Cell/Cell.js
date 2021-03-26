import classes from './Cell.module.css';

const cell  = ({cell, level}) => {
    let cellData = null;
    const classArr = [classes.Cell];
    classArr.push(classes[level.name]);
    if(cell.revealed){
        classArr.push(classes.Revealed);
        if(cell.hasMine){
            cellData = "💣";
        }
        else if(cell.neighbours !== 0){
            cellData = cell.neighbours;
        }
    }
    else{
        cellData = cell.flagged ? "🚩" : null;
    }

    return <div className={classArr.join(' ')} data-row={cell.row} data-column={cell.column}>{cellData}</div>
}

export default cell;