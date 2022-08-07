import mongoose from 'mongoose';
import express from 'express';
import jwt from 'jsonwebtoken';
import req from "express/lib/request.js";

const app = express();
//приложение читает json-запросы
 app.use(express.json());

//get-запрос на главную страницу
app.get('/',(req, res) =>{
    res.send('Тут будет распа.');//выгрузка в html
    console.log("get ok");

} );
//post-запрос на страницу /логин
app.post('/login', (rec,res)=>{
    //вывод тела запроса в консоль
    console.log(req.body);

    // const token = jwt.sign(
    //     {
    //         email: req.body.email,
    //         nickname : 'Bebra777'
    //     }, 'superkey586'
    // )

    //описание тела респонса от сервера
    res.json({
        success: true,

    })
});


app.listen(4443, (err)=> {
    if (err){ return(console.log(err))}
    console.log('Server OK');

})


mongoose.connect('mongodb+srv://Admin:Admin@cluster0.ccd0lek.mongodb.net/Test123?retryWrites=true&w=majority', )
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));


