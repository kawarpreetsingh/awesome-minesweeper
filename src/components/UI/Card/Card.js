import classes from './Card.module.css';

// Card component for Card layout on top of the other components
const Card = props => {
    const classArray = props.className ? [...props.className] : [];
    classArray.push(classes.Card);
    return <div className={classArray.join(' ')}>{props.children}</div>;
}

export default Card;