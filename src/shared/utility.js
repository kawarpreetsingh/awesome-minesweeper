import Cell from "../models/Cell";
import Level from "../models/Level";

export const getRandomValue = dimensionCount => {
    return Math.floor((Math.random() * 1000) + 1) % dimensionCount;
}

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

export const revealEmptyCells = (cells, rows, columns, row, column) => {
    const neighbours = fetchNeighbours(cells, rows, columns, row, column);
    neighbours.forEach(neighbour => {
        if (!neighbour.revealed && !neighbour.flagged && (!neighbour.hasMine || neighbour.empty)) {
            cells[neighbour.row][neighbour.column].revealed = true;
            if (neighbour.empty) {
                revealEmptyCells(cells, rows, columns, neighbour.row, neighbour.column);
            }
        }
    });
}

export const revealAllCells = cells => {
    cells.forEach(cellsRow => cellsRow.forEach(cell => cell.revealed = true));
}

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

export const generateCellsCopy = cells => {
    return cells.map(cellsRow => cellsRow.map(cell => new Cell(cell.row, cell.column, cell.hasMine, cell.revealed, cell.neighbours, cell.flagged, cell.empty)));
}

export const generateLevelCopy = level => {
    return new Level(level.name, level.rows, level.columns, level.mines);
}