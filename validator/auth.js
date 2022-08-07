import {body} from 'express-validator'

export const registerValidator = [
    body('Lesson_Name' , 'Мало букаф').isLength( {min: 3}),
];