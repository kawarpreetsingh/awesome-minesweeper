import classes from './Cell.module.css';

const cell  = ({id, data}) => {
    let cellData = null;
    const classArr = [classes.Cell];
    if(data.revealed){
        classArr.push(classes.Revealed);
        if(data.hasMine){
            cellData = "💣";
        }
        else if(data.neighbours !== 0){
            cellData = data.neighbours;
        }
    }
    else{
        cellData = data.flagged ? "🚩" : null;
    }

    return <div id={id} className={classes.Cell}>{cellData}</div>
}

export default cell;