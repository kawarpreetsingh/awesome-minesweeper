import { LEVELS } from '../../shared/constant';

import refreshIcon from '../../assets/images/refresh.png';

import classes from './Toolbar.module.css';

const Toolbar = ({ onLevelChange, flags, statusMessage }) => {
    const options = LEVELS && LEVELS.length ?
        LEVELS.map(level => (
            <option value={level.name} key={level.name}>{level.name}</option>
        )) : null;
    return (
        <div className={classes.Toolbar}>
            <div className={classes.LevelSelector}>
                <select onChange={onLevelChange}>
                    {options}
                </select>
            </div>
            <div>
                {statusMessage}
            </div>
            <div> 
                🚩 {flags} 
            </div>
            <div className={classes.RefreshIcon}>
                <img 
                    src={refreshIcon} // Refresh button to restart the game with already chosen level
                    alt="Refresh" 
                    onClick={onLevelChange} 
                />
            </div>
        </div>
    );
}

export default Toolbar;