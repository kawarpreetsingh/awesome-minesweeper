class Cell {
    constructor(row, column, hasMine = false, revealed = false, neighbours = 0, flagged = false, empty = false){
        this.row = row;
        this.column = column;
        this.hasMine = hasMine;
        this.revealed = revealed;
        this.neighbours = neighbours;
        this.flagged = flagged;
        this.empty = empty;
    }
}

export default Cell;