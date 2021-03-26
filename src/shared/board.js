import Cell from '../models/Cell';
import { getRandomValue, fetchNeighbours } from './utility';

/*
    This file contain the logic for board which is used by the components
*/

// Create Empty cells
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

// Place mines randomly
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

// Update the neighbour cells after mines are placed
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

// Exported function which generates the cells in the board based upon dynamic rows, columns and mines
export const generateCells = (rows, columns, mines) => {
    let cells = getEmptyCells(rows, columns);
    placeMines(cells, rows, columns, mines);
    updateNeighbours(cells, rows, columns);

    return cells;
}