import {LEVELS} from '../../shared/constant';

const header  = ({onLevelChange, mines}) => {
    const options = LEVELS && LEVELS.length ? LEVELS.map(level => (
        <option value={level.id} key={level.id}>{level.name}</option>
    )) : null;
    return (
        <div>
            <select onChange={onLevelChange}>
                {options}
            </select>
            <div>
                Mines : {mines}
            </div>
        </div>
    );
}

export default header;