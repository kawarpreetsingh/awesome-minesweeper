import { useState } from 'react';

import Header from '../../components/Header/Header';
import Board from '../../components/Board/Board';

import { LEVELS, STATUS_MESSAGES } from '../../shared/constants';
import { generateCells } from '../../shared/board';
import { revealAllCells, generateCellsCopy, revealEmptyCells, getDesiredCells, generateLevelCopy } from '../../shared/utility';

import classes from './Game.module.css';

const Game = () => {

    const [level, setLevel] = useState(generateLevelCopy(LEVELS[0]));

    const [flags, setFlags] = useState(level.mines);

    const [cells, setCells] = useState(generateCells(level.rows, level.columns, level.mines));

    const [statusMessage, setStatusMessage] = useState(STATUS_MESSAGES.new);

    const levelChangedHandler = event => {
        const foundLevel = LEVELS.find(level => level.name === event.target.value);
        const newLevel = generateLevelCopy(foundLevel);
        setLevel(newLevel);
        setFlags(newLevel.mines);
        setCells(generateCells(newLevel.rows, newLevel.columns, newLevel.mines));
    };

    const leftClickedHandler = event => {
        if ('row' in event.target.dataset && 'column' in event.target.dataset) {
            const row = +event.target.dataset.row;
            const column = +event.target.dataset.column;
            const cell = cells[row][column];

            if (cell.revealed || cell.flagged) return;
            
            const updatedCells = generateCellsCopy(cells);
            
            if (cell.hasMine) {
                revealAllCells(updatedCells);
                setStatusMessage(STATUS_MESSAGES.lost);
                setCells(updatedCells);
            }

            const updatedCell = updatedCells[row][column];
            updatedCell.revealed = true;

            if (updatedCell.empty) {
                revealEmptyCells(updatedCells, level.rows, level.columns, row, column);
            }

            if (getDesiredCells(updatedCells, 'hidden').length === flags) {
                revealAllCells(updatedCells);
                setFlags(0);
                setStatusMessage(STATUS_MESSAGES.won);
            }

            if(statusMessage === STATUS_MESSAGES.new){
                setStatusMessage(STATUS_MESSAGES.inProgress);
            }
            setCells(updatedCells);
        }
    }

    const rightClickedHandler = event => {
        event.preventDefault(); // prevents default browser right click
        if ('row' in event.target.dataset && 'column' in event.target.dataset) {
            const row = +event.target.dataset.row;
            const column = +event.target.dataset.column;
            const cell = cells[row][column];

            if(cell.revealed) return;

            const updatedCells = generateCellsCopy(cells);
            const updatedCell = updatedCells[row][column];
            let updatedFlags = flags;

            if(updatedCell.flagged){
                updatedCell.flagged = false;
                updatedFlags++;
            }
            else {
                updatedCell.flagged = true;
                updatedFlags--;
            }

            if(updatedFlags === 0){
                const mineCellsArray = getDesiredCells(updatedCells, 'mines');
                const flagCellsArray = getDesiredCells(updatedCells, 'flags');
                if(JSON.stringify(mineCellsArray) === JSON.stringify(flagCellsArray)){
                    setFlags(0);
                    setStatusMessage(STATUS_MESSAGES.won);
                    revealAllCells(updatedCells);
                }
            }

            if(statusMessage === STATUS_MESSAGES.new){
                setStatusMessage(STATUS_MESSAGES.inProgress);
            }
            setFlags(updatedFlags);
            setCells(updatedCells);
        }
    }

    const classArr = [classes.Game];
    classArr.push(classes[level.name]);

    return (
        <div className={classArr.join(' ')}>
            <Header onLevelChange={levelChangedHandler} flags={flags} statusMessage={statusMessage}/>
            <Board cells={cells} leftClick={leftClickedHandler} rightClick={rightClickedHandler} level={level}/>
        </div>
    );
}

export default Game;