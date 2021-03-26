import { useState } from 'react';

import Toolbar from '../../components/Toolbar/Toolbar';
import Board from '../../components/Board/Board';
import Card from '../../components/UI/Card/Card';

import { LEVELS, STATUS_MESSAGES } from '../../shared/constant';
import { generateCells } from '../../shared/board';
import { revealAllCells, generateCellsCopy, revealCellsUntilNonEmpty, getDesiredCells, generateLevelCopy } from '../../shared/utility';

import classes from './Game.module.css';

// The only stateful component in the app managing the state
const Game = () => {

    // State for level
    const [level, setLevel] = useState(generateLevelCopy(LEVELS[0]));

    // State for remaining flag count
    const [flags, setFlags] = useState(level.mines);

    // State for total cells in the board
    const [cells, setCells] = useState(generateCells(level.rows, level.columns, level.mines));

    // State for current status in the game
    const [statusMessage, setStatusMessage] = useState(STATUS_MESSAGES.new);

    // Restarts the game based upon the chosen level
    const levelChangedHandler = event => {
        const foundLevel = LEVELS.find(level => level.name === event.target.value);
        const newLevel = foundLevel ? generateLevelCopy(foundLevel) : level;
        setLevel(newLevel);
        setFlags(newLevel.mines);
        setCells(generateCells(newLevel.rows, newLevel.columns, newLevel.mines));
        setStatusMessage(STATUS_MESSAGES.new);
    };

    // Handles left click efficiently by using event delegation and datasets
    const leftClickedHandler = event => {
        if ('row' in event.target.dataset && 'column' in event.target.dataset) {
            const row = +event.target.dataset.row;
            const column = +event.target.dataset.column;
            const cell = cells[row][column];

            if (cell.revealed || cell.flagged) return;
            
            const updatedCells = generateCellsCopy(cells); // To avoid state mutation

            if(statusMessage === STATUS_MESSAGES.new){
                setStatusMessage(STATUS_MESSAGES.inProgress);
            }

            if (cell.hasMine) {
                revealAllCells(updatedCells);
                setStatusMessage(STATUS_MESSAGES.lost);
                setCells(updatedCells);
            }

            const updatedCell = updatedCells[row][column];
            updatedCell.revealed = true;

            if (updatedCell.empty) {
                revealCellsUntilNonEmpty(updatedCells, level.rows, level.columns, row, column);
            }

            if (getDesiredCells(updatedCells, 'hidden').length === flags) {
                revealAllCells(updatedCells);
                setFlags(0);
                setStatusMessage(STATUS_MESSAGES.won);
            }

            setCells(updatedCells);
        }
    }

    // Handles right click efficiently by using event delegation and datasets
    const rightClickedHandler = event => {
        event.preventDefault(); // prevents default browser right click
        if ('row' in event.target.dataset && 'column' in event.target.dataset) {
            const row = +event.target.dataset.row;
            const column = +event.target.dataset.column;
            const cell = cells[row][column];

            if(cell.revealed) return;

            const updatedCells = generateCellsCopy(cells); // To avoid state mutation
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

            if(statusMessage === STATUS_MESSAGES.new){
                setStatusMessage(STATUS_MESSAGES.inProgress);
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

            setFlags(updatedFlags);
            setCells(updatedCells);
        }
    }

    const classArray = [classes.Game];
    classArray.push(classes[level.name]);

    return (
        <Card className={classArray}>
            <Toolbar onLevelChange={levelChangedHandler} flags={flags} statusMessage={statusMessage}/>
            <Board cells={cells} leftClick={leftClickedHandler} rightClick={rightClickedHandler} level={level}/>
        </Card>
    );
}

export default Game;