import { useState } from 'react';

import Header from '../../components/Header/Header';
import Board from '../../components/Board/Board';

import { LEVELS } from '../../shared/constant';
import { getBoardData } from '../../shared/utility';

import classes from './Game.module.css';

const Game = () => {

    const [level, setLevel] = useState({...LEVELS[0]});

    const [boardData, setBoardData] = useState(getBoardData(level.rows, level.columns, level.mines));

    const levelChangedHandler = event => {
        const newLevel = LEVELS.find(level => level.id === event.target.value);
        setLevel({...newLevel});
        setBoardData(getBoardData(newLevel.rows, newLevel.columns, newLevel.mines));
    };

    const leftClickedHandler = event => {
        console.log("Left:"+event.target.id);
    }

    const rightClickedHandler = event => {
        console.log("Right:"+event.target.id);
        event.preventDefault(); // prevents default browser right click
    }

    return (
        <div className={classes.Game}>
            <Header onLevelChange={levelChangedHandler} mines={level.mines}/>
            <Board boardData={boardData} leftClick={leftClickedHandler} rightClick={rightClickedHandler}/>
        </div>
    );
}

export default Game;