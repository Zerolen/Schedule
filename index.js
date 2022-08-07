import mongoose from 'mongoose';
import express from 'express';
import jwt from 'jsonwebtoken';
import {validationResult} from "express-validator";
import {registerValidator} from './validator/auth.js'
import UserModel from './models/User.js'

const app = express();
//приложение читает json-запросы
 app.use(express.json());
/*
//get-запрос на главную страницу
app.get('/',(req, res) =>{
    res.send('Тут будет распа.');//выгрузка в html
    console.log("get ok");

} );
*/
/*
//post-запрос на страницу /логин
app.post('/login', (req,res)=>{
    //вывод тела запроса в консоль
    console.log(req.body);

    const token = jwt.sign(
        {
            email: req.body.email,
            nickname : 'Bebra777'
        }, 'superkey586' //пароль для токена(?)
    )

    //описание тела респонса от сервера
    res.json({
        success: true,
        token,

    })
});
*/


app.post('/register', registerValidator, async (req,res)=>  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const doc = new UserModel({
        Lesson_Name: req.body.Lesson_Name
    });

    const Lessons = await doc.save();
    res.json({
        success: true
    })
});

app.get('/', (req, res) =>{
    res.send('Тут будет распа.');//выгрузка в html




} );
app.listen(4443, (err)=> {
    if (err){ return(console.log(err))}
    console.log('Server OK');

})


mongoose.connect('mongodb+srv://Admin:Admin@cluster0.ccd0lek.mongodb.net/ScheduleDB?retryWrites=true&w=majority', )
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));


