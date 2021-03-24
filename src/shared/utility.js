const getRandomValue = dimensionCount => {
    return Math.floor((Math.random() * 1000) + 1) % dimensionCount;
}

const getEmptyBoard = (rows, columns) => {
    let boardData = [];
    for(let i = 0; i < rows; i++){
        boardData.push([]);
        for(let j = 0; j < columns; j++){
            boardData[i][j] = {
                row: i, 
                column: j,
                hasMine: false,
                revealed: false,
                neighbours: 0,
                flagged: false,
                empty: false
            };
        }
    }
    return boardData;
}

const placeMines = (boardData, rows, columns, mines) => {
    let minesPlaced = 0, randomRow, randomColumn;
    while(minesPlaced < mines){
        randomRow = getRandomValue(rows);
        randomColumn = getRandomValue(columns);

        if(!(boardData[randomRow][randomColumn].hasMine)){
            boardData[randomRow][randomColumn].hasMine = true;
            minesPlaced++;
        }
    }
}

const fetchNeighbours = (row, column, boardData, rows, columns) => {
    const neighbours = [];
    
    // Top
    if(row > 0){
        neighbours.push(boardData[row-1][column]);
    }

    // Left
    if(column > 0) {
        neighbours.push(boardData[row][column-1]);
    }

    //Bottom
    if(row < rows - 1){
        neighbours.push(boardData[row+1][column]);
    }

    //Right
    if(column < columns - 1) {
        neighbours.push(boardData[row][column+1]);
    }

    // Top Left
    if(row > 0 && column > 0) {
        neighbours.push(boardData[row-1][column-1]);
    }

    // Top Right
    if(row > 0 && column < columns - 1) {
        neighbours.push(boardData[row-1][column+1]);
    }

    // Bottom Left
    if(row < rows - 1 && column > 0){
        neighbours.push(boardData[row+1][column-1]);
    }

    // Bottom Right
    if(row < rows - 1 && column < columns - 1) {
        neighbours.push(boardData[row+1][column+1]);
    }

    return neighbours;
}

const updateNeighbours = (boardData, rows, columns) => {
    for(let i = 0 ; i < rows; i++){
        for(let j = 0 ; j < columns; j++){
            if(!boardData[i][j].hasMine){
                let neighbourMines = 0;
                const neighbours = fetchNeighbours(boardData[i][j].row, boardData[i][j].column, boardData, rows, columns);
                neighbours.forEach(neighbour => {
                    if(neighbour.hasMine){
                        neighbourMines++;
                    }
                });
                if(neighbourMines === 0){
                    boardData[i][j].empty = true;
                }
                boardData[i][j].neighbours = neighbourMines;
            }
        }
    }
}

export const getBoardData = (rows, columns, mines) => {
    let boardData = getEmptyBoard(rows, columns);
    placeMines(boardData, rows, columns, mines);
    updateNeighbours(boardData, rows, columns);

    return boardData;
}