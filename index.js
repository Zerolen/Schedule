import mongoose from 'mongoose';
import express from 'express';
// import jwt from 'jsonwebtoken';
import {validationResult} from "express-validator";
import {registerValidator} from './validation/auth.js'
import Lesson from './models/Lesson.js'
import TimeDate from "./models/TimeDate.js";




const app = express();
//приложение читает json-запросы
 app.use(express.json());


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

let db;
mongoose.connect('mongodb+srv://Admin:Admin@cluster0.ccd0lek.mongodb.net/ScheduleDB?retryWrites=true&w=majority',
    function (err, database){
        if (err) {console.log('DB error', err)}
        else {
            console.log('DB OK');
            db = database;
        }
    });

//post-запрос на отправку записи в "lessons" (РАБОТАЕТ)
app.post('/addlesson', registerValidator, async (req,res)=>  {

    //проверка валидатором
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const doc = new Lesson({
        Lesson_Name: req.body.Lesson_Name,
        Lesson_type_id: req.body.Lesson_type_id

    });

    db.collection("lessons").insertOne( doc , function (err, db){
        if (err) throw err;
        }
    )

    res.json({
        success: true
    })

});
// post-запрос на отправку записи в "timedate" (РАБОТАЕТ)
app.post('/timetable', async (req,res)=>  {

    const doc = new TimeDate({
        TimeDate_id: req.body.TimeDate_id,
        Lesson_id: req.body.Lesson_id

    });

    db.collection('timedates').insertOne( doc , function (err, db){
            if (err) throw err;
        }
    )

    res.json({
        success: true
    })

});

//маршрутизация на главной странице "/"
app.get('/', (req, res) => {
    //выгрузка в html

    // db.collection('lessons')
    //     .find(
    //         { Lesson_type_id: false },
    //         { projection:{ _id:0, createdAt:0, updatedAt:0, __v:0} })
    //     .toArray(
    //     function (err,data){
    //         if (err) console.log(err);
    //         res.send(data);
    //     }
    // )

    db.collection('timedates')
        .find(
            { Lesson_id: {$ne: null }},
            { projection:{ _id:0} })
        .toArray(
            function (err,data){
                if (err) console.log(err);
                res.send(data);
            }
        )

});

app.get('/mon',
    (req, res) => {
        //выгрузка в html

        db.collection('lessons')
            .find(
                {
                    _id: {$in: db.collection('timedates').distinct("Lesson_id")}
                },
                {projection: {_id: 0, createdAt: 0, updatedAt: 0, __v: 0}})
            .toArray(
                function (err, data) {
                    if (err) console.log(err);
                    res.send(data);
                }
            )

        // db.collection('timedates')
        //     .find(
        //         {
        //             Lesson_id: {$ne: null },
        //             TimeDate_id: {$gt: 1, $lt: 6}
        //         },
        //         { projection:{ _id:0} })
        //     .distinct('Lesson_id')
        //     .toArray( function (err, data){
        //         if(err) throw err;
        //
        //         res.send(data);
        //         console.log(data[0].Lesson_id);
        //
        //
        //
        //         }
        //     );


    });
//проверка подключения к серверу
    app.listen(4443, (err) => {
        if (err) {
            return (console.log(err))
        }
        console.log('Server OK');

    })





