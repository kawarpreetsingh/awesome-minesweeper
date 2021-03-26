import Cell from "../models/Cell";
import Level from "../models/Level";

/*
    This file contains the utility functions
*/

// To get random value for a dimention count    
export const getRandomValue = dimensionCount => {
    return Math.floor((Math.random() * 1000) + 1) % dimensionCount;
}

// Get the neighbour cells based upon provided cell(row and column value)
export const fetchNeighbours = (cells, rows, columns, row, column) => {
    const neighbours = [];

    // Top
    if (row > 0) {
        neighbours.push(cells[row - 1][column]);
    }

    // Left
    if (column > 0) {
        neighbours.push(cells[row][column - 1]);
    }

    //Bottom
    if (row < rows - 1) {
        neighbours.push(cells[row + 1][column]);
    }

    //Right
    if (column < columns - 1) {
        neighbours.push(cells[row][column + 1]);
    }

    // Top Left
    if (row > 0 && column > 0) {
        neighbours.push(cells[row - 1][column - 1]);
    }

    // Top Right
    if (row > 0 && column < columns - 1) {
        neighbours.push(cells[row - 1][column + 1]);
    }

    // Bottom Left
    if (row < rows - 1 && column > 0) {
        neighbours.push(cells[row + 1][column - 1]);
    }

    // Bottom Right
    if (row < rows - 1 && column < columns - 1) {
        neighbours.push(cells[row + 1][column + 1]);
    }

    return neighbours;
}

// Reveal neighbouring cells until non-empty using recursive approach
export const revealCellsUntilNonEmpty = (cells, rows, columns, row, column) => {
    const neighbours = fetchNeighbours(cells, rows, columns, row, column);
    neighbours.forEach(neighbour => {
        if (!neighbour.revealed && !neighbour.flagged && (!neighbour.hasMine || neighbour.empty)) {
            cells[neighbour.row][neighbour.column].revealed = true;
            if (neighbour.empty) {
                revealCellsUntilNonEmpty(cells, rows, columns, neighbour.row, neighbour.column);
            }
        }
    });
}

// Reveal all the cells
export const revealAllCells = cells => {
    cells.forEach(cellsRow => cellsRow.forEach(cell => cell.revealed = true));
}

// Get desired (mines, flags, hidden) cells in the form of an array
export const getDesiredCells = (cells, desiredFeature) => {
    let desiredCells = [];
    cells.forEach(cellsRow => {
        cellsRow.forEach(cell => {
            if ((desiredFeature === 'mines' && cell.hasMine) || 
                (desiredFeature === 'flags' && cell.flagged) ||
                (desiredFeature === 'hidden' && !cell.revealed)) {
                desiredCells.push(cell);
            }
        });
    });
    return desiredCells;
}

// Generate cells copy to be utilized at the time of setting the state to avoid mutation
export const generateCellsCopy = cells => {
    return cells.map(cellsRow => cellsRow.map(cell => new Cell(cell.row, cell.column, cell.hasMine, cell.revealed, cell.neighbours, cell.flagged, cell.empty)));
}

// Generate level copy to be utilized at the time of setting the state to avoid mutation
export const generateLevelCopy = level => {
    return new Level(level.name, level.rows, level.columns, level.mines);
}