import mongoose from 'mongoose';
import express from 'express';


mongoose.connect('mongodb+srv://Admin:Admin@cluster0.ccd0lek.mongodb.net/Test123?retryWrites=true&w=majority', )
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));


