import Level from '../models/Level';

/*
    This file contains the constant data used in the app
*/

// Levels for difficulty, board and style management
export const LEVELS = [
    new Level('Easy', 8, 8, 10),
    new Level('Medium', 12, 12, 20),
    new Level('Hard', 16, 16, 40)
];

// Status messages shown in the top toolbar.
export const STATUS_MESSAGES = {
    new: 'Make your first move',
    inProgress: 'Game is in progress',
    won: 'Congrats, You win!',
    lost: 'Game over!'
};