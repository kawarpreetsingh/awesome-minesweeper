import { LEVELS } from '../../shared/constants';

import classes from './Header.module.css';

const header = ({ onLevelChange, flags, statusMessage }) => {
    const options = LEVELS && LEVELS.length ? LEVELS.map(level => (
        <option value={level.name} key={level.name}>{level.name}</option>
    )) : null;
    return (
        <div className={classes.Header}>
            <div>
                <span>Level </span>
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
        </div>
    );
}

export default header;