import Cell from '../models/Cell';
import { getRandomValue, fetchNeighbours } from './utility';

const getEmptyCells = (rows, columns) => {
    let cells = [];
    for(let i = 0; i < rows; i++){
        cells.push([]);
        for(let j = 0; j < columns; j++){
            cells[i][j] = new Cell(i, j);
        }
    }
    return cells;
}

const placeMines = (cells, rows, columns, mines) => {
    let minesPlaced = 0, randomRow, randomColumn;
    while(minesPlaced < mines){
        randomRow = getRandomValue(rows);
        randomColumn = getRandomValue(columns);

        if(!(cells[randomRow][randomColumn].hasMine)){
            cells[randomRow][randomColumn].hasMine = true;
            minesPlaced++;
        }
    }
}

const updateNeighbours = (cells, rows, columns) => {
    for(let i = 0 ; i < rows; i++){
        for(let j = 0 ; j < columns; j++){
            if(!cells[i][j].hasMine){
                let neighbourMines = 0;
                const neighbours = fetchNeighbours(cells, rows, columns, i, j);
                neighbours.forEach(neighbour => {
                    if(neighbour.hasMine){
                        neighbourMines++;
                    }
                });
                if(neighbourMines === 0){
                    cells[i][j].empty = true;
                }
                cells[i][j].neighbours = neighbourMines;
            }
        }
    }
}

export const generateCells = (rows, columns, mines) => {
    let cells = getEmptyCells(rows, columns);
    placeMines(cells, rows, columns, mines);
    updateNeighbours(cells, rows, columns);

    return cells;
}